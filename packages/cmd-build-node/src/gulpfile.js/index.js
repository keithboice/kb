"use strict";

const { series } = require("gulp");
const del = require("del");
const appRoot = require("app-root-path").toString();
const {
	rollup: { rollup }
} = require("rollup");
const configRollupNode = require('@kb/config-rollup-node');

/**
 * Gulp task for uglifying javascript files.
 * @class
 * @module @kb/cmd-build-node
 */
async function clean(cb) {
	del([appRoot + "/**/dist/*.*", appRoot + "/**/dist/*.*"], cb);
}

/** @returns {Promise<any>} */
async function jsBundle() {
	/**
	 *  rollup --config node:configRollupNode
	 */
	const { write } = await rollup(configRollupNode);

	return await write(configRollupNode);
}


/**
 * The NodeJS build runner for kb projects.
 *
 * @example
 *   const cmdBuildNode = require('@kb/cmd-build-node');
 *   typeof cmdBuildNode;
 *   //=> 'object'
 *
 * @class
 * @param {function} cb.
 * @returns {function} Cb.
 */
exports.build = series(clean, jsBundle);
