#!/usr/bin/env node

"use strict";

const CorePaths = require( "../paths" );
const Lint = require( "../lint" );

const yargs = require( "yargs/yargs" );
const { hideBin } = require( "yargs/helpers" );
const path = require( "path" );
const appRoot = require( "app-root-path" )
  .toString();
const chalk = require( "chalk" );
const log = console.log;
const error = ( message ) => log( chalk.bold.red( `\nError: ${ message }` ) );
const warning = ( message ) => log( chalk.dim.keyword( "orange" )( `\n[Warn] ${ message }` ) );
const success = ( message ) => log( chalk.dim.green( `\nSuccess! ${ message }` ) );
const status = ( message ) => log( chalk.hex( "#555" )( `\n${ message }...` ) );
const table = ( title, message ) => {
  log( chalk.hex( "#555" )( `\n${ title }...` ) );
  chalk.dim.grey( console.table( message ) );
};

let argv = hideBin( process.argv );
argv.wd = undefined;
argv.all = undefined;
argv.backend = undefined;
argv.frontend = undefined;

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
  .usage( "Usage: $0 <command> [options]" )
  .command( "clean", "Remove generated directories from the current project" )
  .command( "lint", "Lint and format the code in the current project" )
  .example( "$0 clean --wd ./ --all", "clean out all generated directories in the project" )
  .nargs( "d", 1 )
  .describe( "d", "Working directory to start execution from" )
  .alias( "d", "wd" )
  .option( "wd", {
    type:    "string",
    default: appRoot
  } )
  .nargs( "a", 0 )
  .describe( "a", "Remove all generated assets" )
  .alias( "a", "all" )
  .option( "all", {
    type: "boolean"
  } )
  .nargs( "b", 0 )
  .describe( "b", "Remove backend assets" )
  .alias( "b", "backend" )
  .option( "backend", {
    type: "boolean"
  } )
  .nargs( "f", 0 )
  .describe( "f", "Remove frontend assets" )
  .alias( "f", "frontend" )
  .option( "frontend", {
    type: "boolean"
  } )
  .alias( "h", "help" )
  .alias( "v", "version" )
  .help( "h" )
  .version( "v" )
  .epilog( "copyright 2021" ).argv;

status( `command: ${ args._ }` );
status( `--wd: ${ args.wd }` );
status( `--all: ${ args.all }` );

/**
 * Calls appropriate @kb package method or function based on command arguments
 */
function run ( cmd, wd, argsObj ) {
  
  table( "arguments", argsObj );
  
  if ( wd === "" ) {
    warning( `working directory not specified so using default value` );
  }
  
  switch ( cmd.toString() ) {
    case "clean":
      clean();
      break;
    case "lint":
      status( "lint command called" );
      break;
    default:
      error( "invalid command argument" );
  }
}

function clean () {
  
  status( `running clean from ${ args.wd }` );
  
  const corePaths = new CorePaths( "package", path.resolve( `${ args.wd }` ) );
  
  let dirs = [];
  
  if ( args.all ) dirs = corePaths.directoriesAll;
  if ( args.backend ) dirs = corePaths.directoriesBackend;
  if ( args.frontend ) dirs = corePaths.directoriesFrontend;
  
  corePaths.clean( dirs )
    .then( response => success( `(${ response.code }) - ${ response.message }` ) )
    .catch( response => error( `(${ response.code }) - ${ response.message }` ) );
}

function lint () {
  
  status( `running lint from ${ args.wd }` );
  
  const lint = new Lint( path.resolve( `${ args.wd }` ) );
  
  const eslint = () => {
    lint.eslintCmd()
      .then( response => success( `(${ response.code }) - ${ response.message }` ) )
      .catch( response => error( `(${ response.code }) - ${ response.message }` ) );
  };
  
  const prettier = () => {
    lint.prettierCmd()
      .then( response => success( `(${ response.code }) - ${ response.message }` ) )
      .catch( response => error( `(${ response.code }) - ${ response.message }` ) );
  };
  
  const stylelint = () => {
    lint.stylelintCmd()
      .then( response => success( `(${ response.code }) - ${ response.message }` ) )
      .catch( response => error( `(${ response.code }) - ${ response.message }` ) );
  };
}

run( args._, args.wd, args );
