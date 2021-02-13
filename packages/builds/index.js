'use strict'

/**
 * Bundled rollup library for kb projects.
 *
 * @example
 *   typeof require('@kb/build') === 'object'
 *   => true
 *
 * @module @kb/build
 * @usasge $ ./cli.js build ./
 */
module.exports = require( 'rollup' )

module.exports.func = require( 'rollup' ).rollup

module.exports.watch = require( 'rollup' ).watch
