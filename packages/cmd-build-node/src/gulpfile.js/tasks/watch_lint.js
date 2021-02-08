"use strict";

const { watch, series } = require("gulp");

/**
 *
 * @param cb
 */
function clean(cb) {
	// Prettier
	cb();
}

/**
 *
 * @param cb
 */
function javascript(cb) {
	// eslint
	cb();
}

/**
 *
 * @param cb
 */
function css(cb) {
	// eslint
	cb();
}

/**
 *
 * Watches for changes files and runs code linters and style.
 * @constructor
 * @example handler()
 * //=> //uglified javascript file
 */
exports.default = function() {
	// You can use a single task
	watch("src/*.css", css);
	// Or a composed task
	// noinspection JSCheckFunctionSignatures
	watch("src/*.js", series(clean, javascript));
};
