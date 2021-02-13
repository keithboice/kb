'use strict'

const localResolve = require( 'rollup-plugin-local-resolve' )
const compiler = require( '@ampproject/rollup-plugin-closure-compiler' )
const { uglify } = require( 'rollup-plugin-uglify' )
const { terser } = require( 'rollup-plugin-terser' )
const pkg = require( './package.json' )

/**
 * Default rollup config for nodejs kb projects.
 *
 * @example
 *   typeof require('@kb/build') === 'object'
 *   => true
 *
 * @module @kb/build
 */
module.exports = [
	{
		input:    'index.js',
		output:   [
			{
				file:   'dist/' + pkg.main,
				format: 'cjs'
			}, {
				file:   'dist/' + pkg.module,
				format: 'es'
			}
		],
		external: [ ...Object.keys( pkg.dependencies || {} ) ],
		plugins:  [ localResolve(), compiler(), uglify(), terser() ]
	}, {
		input:    'conf.js',
		output:   [
			{
				file:   'dist/' + 'conf.js',
				format: 'cjs'
			}, {
				file:   'dist/' + 'conf.mjs',
				format: 'es'
			}
		],
		external: [ ...Object.keys( pkg.dependencies || {} ) ],
		plugins:  [ localResolve(), compiler(), uglify(), terser() ]
	}, {
		input:    'cli.js', // our source file
		output:   [
			{
				file:   'dist/' + 'cli.js',
				format: 'cjs'
			}, {
				file:   'dist/' + 'cli.mjs',
				format: 'es' // the preferred format
			}
		],
		external: [ ...Object.keys( pkg.dependencies || {} ) ],
		plugins:  [ localResolve(), compiler(), uglify(), terser() ]
	}
]
