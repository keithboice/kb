"use strict";

//noinspection FunctionWithInconsistentReturnsJS
/**
 * Compiles template-driven documents
 *
 * @module @kb/paths
 */


const path = require( "path" );
//const fs = require( 'fs' )
const tree = require( "directory-tree" );
const appRoot = require( "app-root-path" )
  .toString();
const rimraf = require( "rimraf" );
const findPackageJson = require( "find-package-json" );
const fg = require( "fast-glob" );

/**
 * @class
 */
module.exports = class Main {
	
	dirDocs = path.resolve( appRoot, "docs" );
	dirReports = path.resolve( this.dirDocs, "reports" );
	dirReportsEslint = path.resolve( this.dirReports, "eslint" );
	dirReportsStylelint = path.resolve( this.dirReports, "stylelint" );
	
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
	constructor ( context, path = appRoot ) {
		/**
		 * @type {string}
		 * @private
		 */
		this._path = path.toString();
		
		/**
		 * @type {string}
		 * @private
		 */
		this._context = context.toLowerCase();
		
		/**
		 * @type {string}
		 * @private
		 */
		this._approot = appRoot.toString();
		
		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._cwd = process.cwd();
		
		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._confJsDocs = "/Users/dkb/repos/kb/packages/script-docs-node/jest.config.js";
		
		/**
		 *
		 * @type {{ext: string, templateBase: string, file: string, templateFile: string, base: string}}
		 * @private
		 */
		this._fileReadme = {
			ext:          "md",
			templateBase: `readme_${ this._context }`,
			templateFile: `readme_${ this._context }.md.hbs`,
			base:         "README",
			file:         "README.md"
		};
		
		this._directoriesCore = [ "dist", "build" ];
		this._directoriesFrontend = [ ".nuxt" ];
		this._directoriesBackend = [ "dist" ];
		this._directoriesDependencies = [ "node_modules", ".pnpm-store" ];
		this._directoriesDocumentation = [ "docs" ];
	}
	
	get approot () {
		return this._approot;
	}
	
	set approot ( value ) {
		this._approot = value;
	}
	
	get confJsDocs () { return this._confJsDocs;}
	
	get context () {
		return this._context;
	}
	
	set context ( value ) {
		this._context = value;
	}
	
	get cwd () {
		return this._cwd;
	}
	
	set cwd ( value ) {
		this._cwd = value;
	}
	
	get directoriesAll () {
		let arrDirectoriesAll = this._directoriesFrontend.concat( this._directoriesBackend );
		arrDirectoriesAll = arrDirectoriesAll.concat( this._directoriesDependencies );
		return arrDirectoriesAll.concat( this._directoriesDocumentation );
	}
	
	get directoriesBackend () { return this._directoriesBackend.concat( this._directoriesCore ); }
	
	get directoriesFrontend () { return this._directoriesFrontend.concat( this._directoriesCore ); }
	
	get fileReadme () { return this._fileReadme;}
	
	get path () {
		return this._path;
	}
	
	set path ( value ) {
		this._path = value;
	}
	
	/**
	 *
	 * @param names
	 * @param opts
	 * @returns {*}
	 */
	clean = ( names = [ "dist" ], opts = [] ) => {
		return new Promise( async ( resolve, reject ) => {
			
			await names.forEach( name => {
				rimraf( name, opts, function( err ) {
					if ( err ) return reject( {
						                          code:    500,
						                          message: err
					                          } );
				} );
			} );
			
			return resolve( {
				                code:    200,
				                message: `removed ${ names.toString() }`
			                } );
		} );
	};
	
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
					                  message: "success",
					                  data:    response
				                  } );
			  } );
			
		} );
		
	};
	
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
		
		const dirs = [];
		await tree( root, filter, null, ( item ) => {
			if ( item.hasOwnProperty( "type" ) && item.type === "directory" && item.size > 0 ) {
				
				let res = {};
				res[ "name" ] =
				  (
					item.hasOwnProperty( "name" )
				  ) ? item.name : ``;
				res[ "path" ] =
				  (
					item.hasOwnProperty( "path" )
				  ) ? item.path : ``;
				res[ "size" ] =
				  (
					item.hasOwnProperty( "size" )
				  ) ? item.size : 0;
				
				dirs.push( res );
			}
		} );
		
		return resolve( {
			                code:    200,
			                message: "success",
			                data:    dirs
		                } );
		
	} );
	
	getJSDocTemplate = ( root = this.cwd ) => {
		return new Promise( async ( resolve ) => {
			
			await fg( [ "**/template-jsdoc" ], {
				cwd: root,
				dot: true
			} )
			  .then( response => {
				  return resolve( {
					                  code:    200,
					                  message: "success",
					                  data:    response
				                  } );
			  } );
			
		} );
	};
	
	/**
	 * Finds nearest package.json file.
	 *
	 * @returns {Promise<object>}
	 * @param {string} root The root directory to start the search from
	 *
	 * @example
	 *   new Main("test").getPackageJson();
	 *   //=> { foo: "bar" }
	 */
	getPackageJson = ( root = this.cwd.toString() ) => new Promise( resolve => {
		
		const record = findPackageJson( root );
		
		let res = {};
		res[ "name" ] = "package.json";
		res[ "path" ] =
		  (
			record.hasOwnProperty( "next" )
		  ) ? record.next().filename : ``;
		
		return resolve( {
			                code:    200,
			                message: "success",
			                data:    res
		                } );
		
	} );
	
	/**
	 * Handler method for the Main class.
	 *
	 * @example
	 *   new Main("test").handler({ foo: "bar" });
	 *   //=> { code: 200, response: 'success' }
	 * @returns {Promise<object>} The response object.
	 */
	handler = () => new Promise( () => {
	
	} );
	
	/**
	 *
	 * @param target
	 * @returns {string}
	 */
	resolve = ( [ target ] ) => {
		return (
		  path.resolve( target.toString() )
		);
	};
};
