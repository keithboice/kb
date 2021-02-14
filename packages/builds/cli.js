#!/usr/bin/env node

"use strict";

const path = require( "path" );
const appRoot = require( "app-root-path" )
  .toString();
const modPath = path.resolve( appRoot, path.join( __dirname ) );
const conf = path.resolve( modPath, path.join( "jest.config.js" ) );

console.log( `appRoot: ${ appRoot }` );
console.log( `modPath: ${ modPath }` );
console.log( `conf: ${ conf }` );

/**
 * Command component of rollup library for kb projects.
 *
 * @example
 *   npm run build ./
 *   => 0
 *
 * @module @kb/build
 * @usasge $ "scripts": {
 *      "build": "build ./"
 * }
 */
const cmd = require( "yargs/yargs" )( process.argv.slice( 2 ) )
  .usage( "Usage: $0 <command> [options]" )
  .command( "build", "Build the nodejs project", ( args ) => {
    console.log( "\nrunning rollup from $s\n", args.argv._[ 1 ] );
    /**
     * Bundled rollup library config for kb projects.
     *
     * @class
     *
     * @module @kb/build
     */
    require( "child_process" )
      .execSync( `npx rollup --config ${ conf }`, // rollup --config src/jest.config.js
                 {
                   cwd:   args.argv._[ 1 ],
                   stdio: "inherit"
                 }
      );
    console.log( "\nfinished running rollup\n" );
  } )
  .example( "$0 build ./", "Builds the app from the repository root" )
  .help( "h" )
  .alias( "h", "help" )
  .epilog( "copyright 2021" ).argv;

console.log( "\n\n", cmd );
