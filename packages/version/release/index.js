'use strict'

/**
 * Common task that handles package releases.
 * @param {object} gulpInst.
 * @returns {object}.
 * @example
 * const { registry, series, task } = require('gulp');
 * const CommonRegistry = require('@kb/task-repo-release');
 * registry(new CommonRegistry({ buildDir: '/dist' }));
 * task('build', series('clean', function build(cb) {
 *      cb();
 * }));
 * //=> { code: 200, response: 'success' }
 */
const gulp = require('gulp');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const conventionalGithubReleaser = require('conventional-github-releaser');
const execa = require('execa');
const fs = require('fs');
const { promisify } = require('util');
const dotenv = require('dotenv');

// load environment variables
const result = dotenv.config();

if (result.error) {
	throw result.error;
}

// Conventional Changelog preset
const preset = 'angular';
// print output of commands into the terminal
const stdio = 'inherit';

async function bumpVersion() {
	// get recommended version bump based on commits
	const { releaseType } = await promisify(conventionalRecommendedBump)({ preset });
	// bump version without committing and tagging
	await execa('npm', ['version', releaseType, '--no-git-tag-version'], {
		stdio,
	});
}

async function changelog() {
	await execa(
		'npx',
		[
			'conventional-changelog',
			'--preset',
			preset,
			'--infile',
			'CHANGELOG.md',
			'--same-file',
		],
		{ stdio }
	);
}

async function commitTagPush() {
	// even though we could get away with "require" in this case, we're taking the safe route
	// because "require" caches the value, so if we happen to use "require" again somewhere else
	// we wouldn't get the current value, but the value of the last time we called "require"
	const { version } = JSON.parse(await promisify(fs.readFile)('package.json'));
	const commitMsg = `chore: release ${version}`;
	await execa('git', ['add', '.'], { stdio });
	await execa('git', ['commit', '--message', commitMsg], { stdio });
	await execa('git', ['tag', `v${version}`], { stdio });
	await execa('git', ['push', '--follow-tags'], { stdio });
}

function githubRelease(done) {
	conventionalGithubReleaser(
		{ type: 'oauth', token: process.env.GH_TOKEN },
		{ preset },
		done
	);
}

exports.release = gulp.series(
	bumpVersion,
	changelog,
	commitTagPush,
	githubRelease
);


