#!/usr/bin/env node

'use strict'

const yargs = require( 'yargs/yargs' )
const path = require( 'path' )
const appRoot = require( 'app-root-path' )
	.toString()
const modPath = path.resolve( appRoot, path.join( __dirname ) )
const conf = path.resolve( modPath, 'conf', path.join( 'jsdocs.js' ) )
const ignore = path.resolve( modPath, 'conf', path.join( '.ignore' ) )
const { execSync } = require( 'child_process' )

/**
 * Generate docs for backend code CLI
 *
 * @example
 *   pnpm run docs ./
 *   => 0
 *
 * @module @kb/script-docs-node
 * @usages $ "scripts": {
 *      "docs": "docs ./"
 * }
 */
const cmd = yargs( process.argv.slice( 2 ) )
	.usage( 'Usage: $0 <command> [options]' )
	.command( 'docs', 'Docs for a nodejs project', ( args ) => {
		const [ first, second ] = args.argv._
		console.log( `\nrunning ${ first } from ${ second }\n` )
		
		/**
		 * Generate docs for backend code.
		 * @module @kb/script-docs-node
		 * @constructor
		 */
		execSync( `pnpx jsdocs ./*.js --configure "${ conf }" --recurse`, {
			cwd:   second,
			stdio: 'inherit'
		} )
		
		console.log( '\nfinished running documentation\n' )
	} )
	.example( '$0 docs ./', 'Generate docs for backend code' )
	.help( 'h' )
	.alias( 'h', 'help' )
	.epilog( 'copyright 2021' ).argv

console.log( '\n\n', cmd )
