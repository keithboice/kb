"use strict";

// eslint-disable-next-line node/no-unpublished-require
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");

/**
 * Gulp task for uglifying javascript files.
 * @module @kb/$NAME
 * @constructor
 */
module.exports = {
	/**
	 * Gulp task for uglifying javascript files.
	 * @constructor
	 * @example handler()
	 * //=> //uglified javascript file
	 *
	 */
	handler: () => {
		exports.default = function() {
			return src("src/*.js")
				.pipe(uglify())
				.pipe(dest("dist/"));
		};
	}
};
