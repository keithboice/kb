#!/usr/bin/env node

'use strict';

const path = require( 'path' );
const appRoot = require( 'app-root-path' );
const modPath = path.resolve( appRoot, path.join( __dirname ) );
const conf = path.resolve( modPath, path.join( 'jest.config.js' ) );
const { execFileSync } = require( 'child_process' );

/**
 * Command component of test library for kb projects.
 *
 * @example
 *   npm run test ./
 *   => 0
 *
 * @module @kb/script-test-node
 * @usage $ "scripts": {
 *      "test": "test ./"
 * }
 */
const cmd = require( 'yargs/yargs' )( process.argv.slice( 2 ) )
  .usage( 'Usage: $0 <command> [options]' )
  .command( 'test', 'test the nodejs project', ( cmd ) => {
	  console.log( '\nrunning jest from $s\n', cmd.argv._ );
	  // noinspection JSCheckFunctionSignatures
	  /**
	   * Bundled jest library config for kb projects.
	   *
	   * @class
	   *
	   * @module @kb/script-test-node
	   */
	  execFileSync( `npx jest -o --config="${ conf }"`, {
		  cwd:   cmd.argv._,
		  stdio: 'inherit'
	  } );
	  console.log( '\nfinished running jest\n' );
  } )
  .example( '$0 test ./', 'Tests the app from the repository root' )
  .help( 'h' )
  .alias( 'h', 'help' )
  .epilog( 'copyright 2021' ).argv;

console.log( '\n\n', cmd );
