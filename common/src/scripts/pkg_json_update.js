'use strict'

const fs = require("fs")
const path = require("path")
const DotJson = require('dot-json')
const appRoot = require("app-root-path").toString()

console.log(`\nappRoot is ${appRoot}\n`)

/**
 * $DESCRIPTION.
 * @constructor
 * @param {string} arg The arg value.
 * @param {object} opt The opt value.
 * @param {number} quantity The quantity value.
 * @returns {Promise} The response object.
 * @example main('test', { val1: 'opt1', val2: 'opt2' }, 9)
 * //=> { code: 200, response: 'success' }
 */
const pkgRoot = path.join(appRoot, 'packages').toString();

const dirs = fs.readdirSync(path.join(appRoot, 'packages'))
	.filter(dir => fs.existsSync(path.join(pkgRoot, dir)) && fs.statSync(path.join(pkgRoot, dir)).isDirectory);

dirs.forEach(dir => {
	const pkg = path.join(appRoot, dir, "package.json")
	
	if (fs.existsSync(pkg)) {
		const pkgJson = new DotJson(pkg)
		const bin = dir.replace("cmd-","")
		
		const schema = {
			"author": "Keith Boice <69816300+keithboice@users.noreply.github.com>",
			"engines":         {
				"node": ">=14.0.0",
				"pnpm": ">=5"
			},
			"files":           [
				"dist/**"
			],
			"homepage":        "https://github.com/keithboice/kb",
			"languageName":    "node",
			"license":         "MIT",
			"main":            "index.js",
			"repository":      {
				"type": "git",
				"url": "https://github.com/keithboice/kb.git"
			},
			"scripts":         {
				"build:cli":     "ncc build ./bin/cli.js --stats-out ../../docs/reports/builds/cmd-jest/vercel.json" +
				                 " -sm -o dist/",
				"build:main":    "ncc build src/index.js --stats-out ../../docs/reports/builds/cmd-jest/vercel.json" +
				                 " -sm -o dist/",
				"build":         "concurrently 'npm:build:cli' 'npm:build:main'",
			},
			"version":         "0.0.1",
			"name":            "@kb/config-jest",
			"devDependencies": {
				"@vercel/ncc": "^0.27.0",
				"app-root-path": "^3.0.0",
				"rimraf": "^3.0.2"
			}
		}
		
		pkgJson
			.set(`author`, "Keith Boice <69816300+keithboice@users.noreply.github.com>")
			.set(`bin.${bin}`, 'dist/cli.js')
			.set(`engines.node`, '>=14.0.0')
			.set(`engines.pnpm`, '>=5')
			.set('files', ["dist/**"])
			.set('homepage', "https://github.com/keithboice/kb")
			.set('main', "dist/index.js")
			.set('license', "MIT")
			.set('repository.type', "git")
			.set('repository.url', "https://github.com/keithboice/kb.git")
			.set('scripts.build:cli', `rimraf dist && ncc build bin/cli.js --stats-out ../../docs/reports/builds/${dir}/vercel.json -sm -o dist/`)
			.set('scripts.build:main', `rimraf dist && ncc build src/index.js --stats-out ../../docs/reports/builds/${dir}/vercel.json -sm -o dist/`)
			.set('scripts.build', "concurrently 'npm:build:cli' 'npm:build:main")
			.set('name', `@kb/${dir}`)
			.set('version', "0.0.1")
			.set('devDependencies.@vercel/ncc', "^0.27.0")
			.set('devDependencies.app-root-path', "^3.0.0")
			.set('devDependencies.rimraf', "^3.0.2")
			.set('devDependencies.concurrently', "^5.3.0")
			.save(function(){
				console.log('saved');
		});
	}
})

