'use strict'

const path = require( 'path' )
//const fs = require( 'fs' )
const tree = require( 'directory-tree' )
const appRoot = require( 'app-root-path' )
const rimraf = require( 'rimraf' )
const findPackageJson = require( 'find-package-json' )
const fg = require( 'fast-glob' )

//noinspection FunctionWithInconsistentReturnsJS
/**
 * Compiles template-driven documents
 *
 * @class
 *
 * @module @kb/get-paths
 */
module.exports = class Main {
	
	/**
	 * Creates the Main object class.
	 *
	 * @example
	 *   new Main("package", "/");
	 *   //=> { _arg: 'test'}
	 *
	 * @param context
	 * @param path
	 */
	constructor ( context, path ) {
		/**
		 * @type {string}
		 * @private
		 */
		this._path = path.toString()
		
		/**
		 * @type {string}
		 * @private
		 */
		this._context = context.toLowerCase()
		
		/**
		 * @type {string}
		 * @private
		 */
		this._approot = appRoot.toString()
		
		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._cwd = process.cwd()
		
		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._confJsDocs = '/Users/dkb/repos/kb/packages/script-docs-node/conf.js'
		
		/**
		 *
		 * @type {{ext: string, templateBase: string, file: string, templateFile: string, base: string}}
		 * @private
		 */
		this._fileReadme = {
			ext:          'md',
			templateBase: `readme_${ this._context }`,
			templateFile: `readme_${ this._context }.md.hbs`,
			base:         'README',
			file:         'README.md'
		}
	}
	
	get approot () {
		return this._approot
	}
	
	set approot ( value ) {
		this._approot = value
	}
	
	get confJsDocs () { return this._confJsDocs}
	
	get context () {
		return this._context
	}
	
	set context ( value ) {
		this._context = value
	}
	
	get cwd () {
		return this._cwd
	}
	
	set cwd ( value ) {
		this._cwd = value
	}
	
	get fileReadme () { return this._fileReadme}
	
	get path () {
		return this._path
	}
	
	set path ( value ) {
		this._path = value
	}
	
	/**
	 *
	 * @param names
	 * @param opts
	 * @returns {*}
	 */
	clean = ( names = [ 'dist' ], opts = [] ) => {
		return new Promise( async ( resolve, reject ) => {
			
			await names.forEach( name => {
				rimraf( name, opts, function ( err ) {
					if ( err ) return reject( {
						                          code:    500,
						                          message: err
					                          } )
				} )
			} )
			
			return resolve( {
				                code:    200,
				                message: 'success'
			                } )
		} )
	}
	
	/**
	 * Returns a list of directories filtered by the 'glob' argument value
	 * @param glob
	 * @param root
	 * @returns {Promise<array>}
	 */
	filterDirectories = ( glob, root ) => {
		
		return new Promise( async ( resolve ) => {
			
			await fg( [ glob ], {
				cwd:    root,
				dot:    true,
				ignore: [
					`**/.pnpm-store/${ glob }`, `**/node_modules/${ glob }`, `/.run/${ glob }`, `/docs/${ glob }`
				]
			} )
				.then( response => {
					return resolve( {
						                code:    200,
						                message: 'success',
						                data:    response
					                } )
				} )
			
		} )
		
	}
	
	/**
	 *
	 * @param {string} root
	 * @param {object} filter
	 * @returns {Promise<array>}
	 */
	getDirectories = ( root = this.cwd, filter = {
		extensions: /./,
		exclude:    [ /pnpm/, /node_modules/, /idea/ ]
	} ) => new Promise( async resolve => {
		
		const dirs = []
		await tree( root, filter, null, ( item ) => {
			if ( item.hasOwnProperty( 'type' ) && item.type === 'directory' && item.size > 0 ) {
				
				let res = {}
				res[ 'name' ] =
					(
						item.hasOwnProperty( 'name' )
					) ? item.name : ``
				res[ 'path' ] =
					(
						item.hasOwnProperty( 'path' )
					) ? item.path : ``
				res[ 'size' ] =
					(
						item.hasOwnProperty( 'size' )
					) ? item.size : 0
				
				dirs.push( res )
			}
		} )
		
		return resolve( {
			                code:    200,
			                message: 'success',
			                data:    dirs
		                } )
		
	} )
	
	getJSDocTemplate = ( root = this.cwd ) => {
		return new Promise( async ( resolve ) => {
			
			await fg( [ '**/template-jsdoc' ], {
				cwd: root,
				dot: true
			} )
				.then( response => {
					return resolve( {
						                code:    200,
						                message: 'success',
						                data:    response
					                } )
				} )
			
		} )
	}
	
	/**
	 * Finds nearest package.json file.
	 *
	 * @example
	 *   new Main("test").getPackageJson();
	 *   //=> { foo: "bar" }
	 * @returns {Promise<object>}
	 */
	getPackageJson = ( root = this.cwd ) => new Promise( resolve => {
		
		const record = findPackageJson( root )
		
		let res = {}
		res[ 'name' ] = 'package.json'
		res[ 'path' ] =
			(
				record.hasOwnProperty( 'next' )
			) ? record.next().filename : ``
		
		return resolve( {
			                code:    200,
			                message: 'success',
			                data:    res
		                } )
		
	} )
	
	/**
	 * Handler method for the Main class.
	 *
	 * @example
	 *   new Main("test").handler({ foo: "bar" });
	 *   //=> { code: 200, response: 'success' }
	 * @returns {Promise<object>} The response object.
	 */
	handler = () => new Promise( () => {
	
	} )
	
	/**
	 *
	 * @param target
	 * @returns {string}
	 */
	resolve = target => path.resolve( '/', target )
}
