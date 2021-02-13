"use strict";

const fs = require("fs");
const util = require("util");

const DefaultRegistry = require("undertaker-registry");
const del = require("del");
const appRoot = require("app-root-path").toString();

function CommonRegistry(opts) {
	DefaultRegistry.call(this);

	opts = opts || {};

	this.buildDir = opts.buildDir || "./build";
}

util.inherits(CommonRegistry, DefaultRegistry);

/**
 * Common task that handles clean.
 * @param {object} gulpInst.
 * @returns {object}.
 * @example
 * const { registry, series, task } = require('gulp');
 * const CommonRegistry = require('@kb/task-clean-node');
 * registry(new CommonRegistry({ buildDir: '/dist' }));
 * task('build', series('clean', function build(cb) {
 *      cb();
 * }));
 * //=> { code: 200, response: 'success' }
 */
CommonRegistry.prototype.init = function(gulpInst) {
	const buildDir = this.buildDir;
	const exists = fs.existsSync(buildDir);

	if (exists) {
		throw new Error("Cannot initialize common tasks. " + buildDir + " directory exists.");
	}

	gulpInst.task("clean-node", async function() {
		const targetGlobs = await del([appRoot + "/**/dist/*.*", appRoot + "/**/dist/*.*"]);

		console.log("Deleted directories:\n", targetGlobs);

		return del([buildDir]);
	});
};

module.exports = CommonRegistry;
