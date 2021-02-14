#!/usr/bin/env node

'use strict'

const Builds = require( '../builds' )
const Paths = require( '../paths' )
const Lint = require( '../lint' )

const yargs = require( 'yargs/yargs' )
const { hideBin } = require( 'yargs/helpers' )
const path = require( 'path' )
const appRoot = require( 'app-root-path' )
  .toString()
const chalk = require( 'chalk' )
const log = console.log
const error = ( message ) => log( chalk.bold.red( `\nError: ${ message }` ) )
const warning = ( message ) => log( chalk.dim.keyword( 'orange' )( `\n[Warn] ${ message }` ) )
const success = ( message ) => log( chalk.dim.green( `\nSuccess! ${ message }` ) )
const status = ( message ) => log( chalk.hex( '#555' )( `\n${ message }...` ) )
const table = ( title, message ) => {
	log( chalk.hex( '#555' )( `\n${ title }...` ) )
	chalk.dim.grey( console.table( message ) )
}

let argv = hideBin( process.argv )
argv.wd = undefined
argv.all = undefined
argv.backend = undefined
argv.frontend = undefined

status( `approot is ${ appRoot }` )
status( `__dirname is ${ __dirname }` )
status( `cwd is ${ process.cwd() }` )
status( `root is ${ path.resolve( '../../' ) }` )

/*
 "preinstall": "npx only-allow pnpm",
 "commit:":    "echo 'please do git actions from mono root'",
 "build":      "./cli.js build --wd ./",
 "deploy":     "./cli.js deploy --wd ./",
 "docs":       "./cli.js docs --wd ./",
 "clean":      "./cli.js clean --wd ./",
 "lint":       "./cli.js lint --wd ./",
 "release":    "./cli.js release --wd ./",
 "reports":    "./cli.js reports --wd ./",
 "test":       "./cli.js test --wd ./",
 "push":       "./cli.js push --wd ./"
 */

/**
 * Core CLI library.
 *
 * @example
 *   pnpm run lint --wd ./
 *   => 0
 *
 * @module @kb/cli
 * @usages $ "scripts": {
 *      "lint": "lint --wd ./"
 * }
 */
const args = yargs( argv )
  .usage( 'Usage: $0 <command> [options]' )
  .example( '$0 dev clean --wd ./ --all', 'clean out all generated directories in the project' )
  .command( 'dev', 'The primary command' )
  .command( 'build', 'Compile, minify, transpile the code in the current project' )
  .command( 'clean', 'Remove generated directories from the current project' )
  .command( 'docs', 'Generate documentation throughout the current project' )
  .command( 'lint', 'Lint and format the code in the current project' )
  .nargs( 'd', 1 )
  .describe( 'd', 'Working directory to start execution from' )
  .alias( 'd', 'wd' )
  .option( 'wd', {
	  type:    'string',
	  default: appRoot
  } )
  .nargs( 'a', 0 )
  .describe( 'a', 'Remove all generated assets' )
  .alias( 'a', 'all' )
  .option( 'all', {
	  type: 'boolean'
  } )
  .nargs( 'b', 0 )
  .describe( 'b', 'Remove backend assets' )
  .alias( 'b', 'backend' )
  .option( 'backend', {
	  type: 'boolean'
  } )
  .nargs( 'f', 0 )
  .describe( 'f', 'Remove frontend assets' )
  .alias( 'f', 'frontend' )
  .option( 'frontend', {
	  type: 'boolean'
  } )
  .nargs( 'n', 1 )
  .describe( 'n', 'A name value' )
  .alias( 'n', 'name' )
  .option( 'name', {
	  type: 'string'
  } )
  .alias( 'h', 'help' )
  .alias( 'v', 'version' )
  .help( 'h' )
  .version( 'v' )
  .epilog( 'copyright 2021' ).argv

/**
 * Calls appropriate @kb package method or function based on command arguments
 */
function run ( cmd, positional, wd, name, argsObj ) {
	
	process.chdir( path.resolve( wd ) )
	status( `changed process.cwd to ${ process.cwd() }` )
	
	if ( wd === '' ) {
		warning( `working directory not specified so using default value` )
	}
	
	status( `running ${ cmd } ${ positional } from ${ path.resolve( wd ) }` )
	
	switch ( positional ) {
		case 'build':
			build( wd, name )
			break
		case 'clean':
			clean()
			break
		case 'lint':
			lint()
			break
		default:
			error( 'invalid command argument' )
	}
}

function build ( wd, name ) {
	
	const { buildRollup } = new Builds( 'all', path.resolve( `${ wd }` ) )
	
	buildRollup( name )
	  .then( response => success( `(${ response.code }) - ${ response.message }` ) )
	  .catch( response => error( `(${ response.code }) - ${ response.message }` ) )
	
}

function clean () {
	
	const paths = new Paths( 'package', path.resolve( `${ args.wd }` ) )
	
	let dirs = []
	
	if ( args.all ) dirs = paths.directoriesAll
	if ( args.backend ) dirs = paths.directoriesBackend
	if ( args.frontend ) dirs = paths.directoriesFrontend
	
	paths.clean( dirs )
	  .then( response => success( `(${ response.code }) - ${ response.message }` ) )
	  .catch( response => error( `(${ response.code }) - ${ response.message }` ) )
}

function lint () {
	
	const {
		      eslintCmd,
		      prettierCmd,
		      stylelintCmd
	      } = new Lint( path.resolve( `${ args.wd }` ) )
	
	stylelintCmd()
	  .then( response => success( `stylelint (${ response.code }) - ${ response.message }` ) )
	  .catch( response => error( `stylelint (${ response.code }) - ${ response.message }` ) )
	
	eslintCmd()
	  .then( response => {
		  
		  success( `eslint (${ response.code }) - ${ response.message }` )
		  
		  prettierCmd()
			.then( response => success( `prettier (${ response.code }) - ${ response.message }` ) )
			.catch( response => error( `prettier (${ response.code }) - ${ response.message }` ) )
		 
	  } )
	  .catch( response => error( `eslint (${ response.code }) - ${ response.message }` ) )
	
}

run( args._[ 0 ].toString(), args._[ 1 ].toString(), args.wd.toString(), args.name.toString(), args )
