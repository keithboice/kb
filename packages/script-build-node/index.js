"use strict";

/**
 * Bundled rollup library for kb projects.
 *
 * @example
 *   typeof require('@kb/script-build-node') === 'object'
 *   => true
 *
 * @module @kb/script-build-node
 * @usasge $ ./cli.js build ./
 */
module.exports = require("rollup");

module.exports.func = require("rollup").rollup;

module.exports.watch = require("rollup").watch;
