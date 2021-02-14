"use strict";

const GetPaths = require( "../paths" );
const fs = require( "fs" );
const https = require( "https" );
const { explainSync } = require( "jsdoc-api" );
const parse = require( "jsdoc-parse" );
const handlebars = require( "handlebars" );

//noinspection FunctionWithInconsistentReturnsJS
/**
 * Compiles template-driven documents
 *
 * @class
 *
 * @module @kb/make-docs
 */
module.exports = class Main {
	/**
	 * Creates the Main object class.
	 *
	 * @example
	 *   new Main("test");
	 *   //=> { _arg: 'test'}
	 *
	 * @param context
	 * @param path
	 */
	constructor ( context, path ) {
		this._context = context.toLowerCase();
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
	
	set path ( value ) {
		this._path = value;
	}
	
	/**
	 * Compiles a final document via Handlebars using the provided template source
	 * and data to apply.
	 *
	 * @param source
	 * @param data
	 * @param dest
	 * @returns {Promise<string>}
	 */
	compile = ( source, data, dest ) => {
		return new Promise( ( resolve, reject ) => {
			
			fs.readFile( `./${ source }`, "utf8", function( err, hbs ) {
				if ( err ) return reject( err );
				
				const template = handlebars.compile( hbs );
				const hydrated = template( data );
				
				const final = fs.writeFileSync( dest, hydrated );
				return resolve( final );
			} );
		} );
	};
	
	/**
	 * Gets data from JSDocs parse of current module.
	 *
	 * @example
	 *   new Main("test").fetchDocsData();
	 *   //=> { foo: "bar" }
	 *
	 * @returns {object}
	 */
	fetchDocsData = async () => {
		return new Promise( async ( resolve ) => {
			const explain = await explainSync( {
				                                   files:     "./**/*.js",
				                                   configure: this.getPaths().confJsDocs,
				                                   cache:     true,
				                                   recurse:   true
			                                   } );
			
			const parsed = await parse( explain );
			
			console.log( `fetchDocsData ran` );
			
			/* handle success response */
			return resolve( parsed );
		} );
	};
	
	/**
	 * @returns {Promise<object>}
	 * @param templateFile
	 */
	fetchTemplate ( templateFile ) {
		return new Promise( async ( resolve, reject ) => {
			if ( !templateFile ) return reject( "missing required argument" );
			
			const temp = `${ templateFile }`;
			console.log( `temp: ${ temp }` );
			const file = fs.createWriteStream( temp );
			
			https.get( `https://raw.githubusercontent.com/keithboice/kb_template_github/main/${ temp }`, ( res ) => {
				const stream = res.pipe( file );
				
				stream.on( "error", ( err ) => {
					console.error( `fetchTemplate error: ${ err }` );
				} );
				
				stream.on( "finish", function() {
					console.log( "fetchTemplate ran" );
					return resolve( temp );
				} );
			} );
		} );
	}
	
	/**
	 * Static helper for the Main class.
	 *
	 * @example
	 *   new Main("test", { val1: "opt1", val2: "opt2" }, 9).getPaths();
	 *   //=> 9
	 *
	 * @returns {function}
	 */
	getPaths = () => {
		return new GetPaths( this._context, __dirname );
	};
	
	/**
	 * Handler method for the Main class.
	 *
	 * @example
	 *   new Main("test").handler({ foo: "bar" });
	 *   //=> { code: 200, response: 'success' }
	 *
	 * @returns {Promise<object>} The response object.
	 */
	handler ( file, templateFile ) {
		return new Promise( ( resolve, reject ) => {
			this.getPaths()
			  .getPackageJson()
			  .then( ( response ) => {
				  const dataPkg = require( `${ response.data.path }` );
				  this.fetchDocsData()
					.then( () => {
						this.fetchTemplate( templateFile )
						  .then( ( streamTemplate ) => {
							  this.parseData( dataPkg )
								.then( ( data ) => {
									this.compile( streamTemplate, data, `${ file }` )
									  .then( ( r ) => {
										  return resolve( {
											                  code:     200,
											                  response: r
										                  } );
									  } )
									  .catch( ( err ) => {
										  return reject( {
											                 code:     500,
											                 response: err
										                 } );
									  } );
								} )
								.catch( ( err ) => console.log( `err: ${ err }` ) );
						  } )
						  .catch( ( err ) => console.log( `err: ${ err }` ) );
					} )
					.catch( ( err ) => console.log( `err: ${ err }` ) );
			  } )
			  .catch( ( err ) => console.log( `err: ${ err }` ) );
		} );
	}
	
	makeMdTable = ( data, header ) => {
		
		let head = "| ";
		let sub = "|";
		let body = "";
		
		header.forEach( column => {
			head += column + "|";
			sub += "-----------------|";
		} );
		
		for ( const [ key, value ] of Object.entries( data ) ) {
			body += `| ${ key } | ${ value } |\n`;
		}
		
		return head + "\n" + sub + "\n" + body;
		
	};
	
	parseData ( dataPkg ) {
		return new Promise( ( resolve, reject ) => {
			/* handle exceptions and bad requests */
			if ( !dataPkg ) return reject( {
				                               code:     400,
				                               response: "missing required argument"
			                               } );
			
			console.log( "dataPkg ran" );
			
			/* handle success response */
			const {
				      scripts,
				      bin,
				      types,
				      engines,
				      dependencies,
				      name,
				      module,
				      languageName,
				      main,
				      description
			      } = dataPkg;
			
			return resolve( {
				                name:         name,
				                description:  description,
				                files:        {
					                main:   main,
					                bin:    bin,
					                module: module
				                },
				                scripts:      this.makeMdTable( scripts, [ "command", "runs" ] ),
				                stack:        {
					                language: languageName,
					                type:     types,
					                engines:  engines
				                },
				                dependencies: this.makeMdTable( dependencies, [ "package", "version" ] )
			                } );
		} );
	}
};
