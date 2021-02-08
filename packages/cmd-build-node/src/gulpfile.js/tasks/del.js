"use strict";

const del = require("del");
const appRoot = require("app-root-path").toString();

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
		exports.default = async function() {
			return await del([appRoot + "/**/dist/*.*", appRoot + "/**/dist/*.*"]);
		};
	}
};
