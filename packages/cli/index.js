'use strict'

/**
 * Execute commands and npm-scripts in the current project
 *
 * @example
 *   typeof require('@kb/build') === 'object'
 *   => true
 *
 * @type {module.Main}
 * @module @kb/build
 */

const { execSync } = require( 'child_process' )
const Paths = require( '../paths' )
const paths = new Paths( 'package' )
const appRoot = paths.approot

/**
 * @class
 */
module.exports = class Main {
	/**
	 *
	 * @param {string} path Overrides cwd value
	 */
	constructor ( path = appRoot ) {
		/**
		 * @type {string}
		 * @private
		 */
		this._path = path.toString()
		
		process.chdir( path )
	}
	
	cmd = ( cmd, args ) => {
		return new Promise( ( resolve, reject ) => {
			
			const run = execSync( `npx ${ cmd } ${ args }`, {
				cwd:   this._path,
				stdio: 'inherit'
			} )
			
			run.stdout.on( 'data', ( data ) => {
				console.info( data )
			} )
			
			run.stderr.on( 'data', ( data ) => {
				console.error( `${ cmd }  error: ${ data }` )
			} )
			
			run.on( 'close', ( code ) => {
				if ( code !== 0 ) {
					reject( `${ cmd }  failed` )
				}
				
				resolve( `${ cmd } succeeded` )
			} )
			
		} )
	}
	
}
