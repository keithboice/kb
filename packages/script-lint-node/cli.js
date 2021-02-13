#!/usr/bin/env node

'use strict'

const yargs = require( 'yargs/yargs' )
const path = require( 'path' )
const appRoot = require( 'app-root-path' )
	.toString()
const modPath = path.resolve( appRoot, path.join( __dirname ) )
const confEslint = path.resolve( modPath, 'conf', path.join( 'eslint.js' ) )
const confPrettier = path.resolve( modPath, 'conf', path.join( 'prettier.js' ) )
const confEslintIgnore = path.resolve( modPath, 'conf', path.join( '.eslintignore' ) )
const confPrettierIgnore = path.resolve( modPath, 'conf', path.join( '.prettierignore' ) )
const { execSync } = require( 'child_process' )

/**
 * Command component of documentation library for kb projects.
 *
 * @example
 *   npm run lint ./
 *   => 0
 *
 * @module @kb/script-lint-node
 * @usages $ "scripts": {
 *      "docs": "docs ./"
 * }
 */
const cmd = yargs( process.argv.slice( 2 ) )
	.usage( 'Usage: $0 <command> [options]' )
	.command( 'lint', 'lint and clean code for a nodejs project', ( args ) => {
		
		console.log( `\nrunning lint and clean from ${ args.argv._[ 1 ] }\n` )
		
		/**
		 * Lints and cleans backend code.
		 * @module @kb/script-lint-node
		 * @constructor
		 */
		execSync(
			`pnpx eslint -c "${ confEslint }" --ignore-path "${ confEslintIgnore }" --quiet --color --fix . && pnpx prettier -c "${ confPrettier }" --ignore-path "${ confPrettierIgnore }" --color --write .`,
			{
				cwd:   args.argv._[ 1 ],
				stdio: 'inherit'
			}
		)
		
		console.log( '\nfinished running documentation\n' )
	} )
	.example( '$0 lint ./', 'Lint and clean nodejs code' )
	.help( 'h' )
	.alias( 'h', 'help' )
	.epilog( 'copyright 2021' ).argv

console.log( '\n\n', cmd )
