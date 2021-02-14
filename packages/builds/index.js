"use strict";

/**
 * Build (compile, minify, transpile) the code in the current project
 *
 * @example
 *   typeof require('@kb/build') === 'object'
 *   => true
 *
 * @module @kb/build
 */

const { rollup } = require( "rollup" );
const {
	      babel,
	      getBabelOutputPlugin
      } = require( "@rollup/plugin-babel" );
const babelPluginProposalClassProps = require( "@babel/plugin-proposal-class-properties" );
const babelPluginSyntaxClassProps = require( "@babel/plugin-syntax-class-properties" );
const babelPresetEnv = require( "@babel/preset-env" );
const { nodeResolve } = require( "@rollup/plugin-node-resolve" );
const { terser } = require( "rollup-plugin-terser" );
const path = require( "path" );
const Paths = require( "../paths" );
const { approot } = new Paths( "package" );

const Cli = require( "../cli" );
const { cmd: cmd } = new Cli( `${ approot }` );

/** @class */
module.exports = class Main {
	constructor ( context = "all", path = `${ approot }` ) {
		/**
		 * @private
		 *
		 * @type {string}
		 */
		this._context = context;
		
		/**
		 * @private
		 *
		 * @type {string}
		 */
		this._path = path.toString();
	}
	
	get context () {
		return this._context;
	}
	
	set context ( value ) {
		this._context = value;
	}
	
	get path () {
		return this._path;
	}
	
	buildRollup = async ( entry = "index.js" ) => {
		return new Promise( async ( resolve ) => {
			const inputOptions = {
				// core input options
				external: [ ...Object.keys( this.getDependencies() || {} ) ],
				input:    path.join( this._path, entry ),
				plugins:  [
					nodeResolve(), terser(), babel( {
						                                presets:      [ babelPresetEnv ],
						                                plugins:      [
							                                babelPluginProposalClassProps, babelPluginSyntaxClassProps
						                                ],
						                                babelHelpers: "bundled"
					                                } )
				]
			};
			
			const outputOptions = {
				file:    path.join( this._path, "dist/main.js" ),
				format:  "cjs",
				name:    "main",
				plugins: [ getBabelOutputPlugin( { presets: [ babelPresetEnv ] } ) ]
			};
			
			// create a bundle
			const {
				      generate,
				      close,
				      write
			      } = await rollup( inputOptions );
			
			//console.log( watchFiles ) // an array of file names this bundle depends on
			
			// generate output specific code in-memory
			// you can call this function multiple times on the same bundle object
			const { output } = await generate( outputOptions );
			
			for ( const chunkOrAsset of output ) {
				if ( chunkOrAsset.type === "asset" ) {
					// For assets, this contains
					// {
					//   fileName: string,              // the asset file name
					//   source: string | Uint8Array    // the asset source
					//   type: 'asset'                  // signifies that this is an asset
					// }
					//console.log( 'Asset', chunkOrAsset )
				}
				else {
					// For chunks, this contains
					// {
					//   code: string,                  // the generated JS code
					//   dynamicImports: string[],      // external modules imported dynamically by the chunk
					//   exports: string[],             // exported variable names
					//   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
					//   fileName: string,              // the chunk file name
					//   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
					//   imports: string[],             // external modules imported statically by the chunk
					//   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
					//   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
					//   isEntry: boolean,              // is this chunk a static entry point
					//   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
					//   map: string | null,            // sourcemaps if present
					//   modules: {                     // information about the modules in this chunk
					//     [id: string]: {
					//       renderedExports: string[]; // exported variable names that were included
					//       removedExports: string[];  // exported variable names that were removed
					//       renderedLength: number;    // the length of the remaining code in this module
					//       originalLength: number;    // the original length of the code in this module
					//     };
					//   },
					//   name: string                   // the name of this chunk as used in naming patterns
					//   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
					//   type: 'chunk',                 // signifies that this is a chunk
					// }
					//console.log( 'Chunk', chunkOrAsset.modules )
				}
			}
			
			// write the bundle to disk
			await write( outputOptions );
			
			// closes the bundle
			await close();
			
			return resolve( {
				                code:    200,
				                message: `generated ${ outputOptions.file } from ${ inputOptions.input }`,
				                data:    outputOptions
			                } );
		} );
	};
	
	getDependencies = () => {
		const pkg = require( path.join( `${ this._path }`, "package.json" ) );
		return pkg.dependencies;
	};
	
	/** @returns {function} Rollup */
	rollup = () => {
		return require( "rollup" );
	};
	
	/** @returns {Buffer} Rollup command execution */
	rollupCmd = ( entry = "index.js", config ) => {
		return new Promise( ( resolve, reject ) => {
			cmd( "rollup", `--config ${ config }` )
			  .then( ( response ) => {
				  return resolve( {
					                  code:    200,
					                  message: "success",
					                  data:    response
				                  } );
			  } )
			  .catch( ( error ) => {
				  return reject( {
					                 code:    500,
					                 message: "error",
					                 data:    `error caught in rollupCmd: ${ error.toString() }`
				                 } );
			  } );
		} );
	};
	
	run = () => {
		//[ 'dist', 'docs', 'build' ] |>  clean |> this.rollupCmd
	};
};
