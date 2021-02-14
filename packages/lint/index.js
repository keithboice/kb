"use strict";

/**
 * Lints and cleans code in the current project
 *
 * @example
 *   typeof require('@kb/lint') === 'object'
 *   => true
 *
 * @type {module.Main}
 * @module @kb/lint
 */

const Paths = require( "../paths" );
const paths = new Paths( "package" );
const appRoot = paths.approot;

const Cli = require( "../cli" );
const { cmd: cmd } = new Cli( `${ paths.approot }` );

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
		this._path = path.toString();
	}
	
	/**
	 *
	 * @returns {function} eslint
	 */
	eslint = () => {
		return require( "eslint" );
	};
	
	/**
	 *
	 * @returns {Buffer} eslint command execution
	 */
	eslintCmd = () => {
		return new Promise( ( resolve, reject ) => {
			
			cmd( "eslint",
			     `--configure ./conf/eslint.config.js --ignore-path ./conf/eslint.ignore --cache --quiet --color --fix --output-file ${ paths.dirReportsEslint } .`
			)
			  .then( response => {return resolve( response );} )
			  .catch( error => {return reject( error );} );
			
		} );
	};
	
	/**
	 *
	 * @returns {function} prettier
	 */
	prettier = () => {
		return require( "prettier" );
	};
	
	/**
	 *
	 * @returns {Buffer} prettier command execution
	 */
	prettierCmd = () => {
		return new Promise( ( resolve, reject ) => {
			
			cmd( "prettier",
			     `--configure ./conf/prettier.config.js --ignore-path ./conf/prettier.ignore  --color --write .`
			)
			  .then( response => {return resolve( response );} )
			  .catch( error => {return reject( error );} );
			
		} );
	};
	
	/**
	 *
	 * @returns {function} stylelint
	 */
	stylelint = () => {
		return require( "stylelint" );
	};
	
	/**
	 *
	 * @returns {Buffer} stylelint command execution
	 */
	stylelintCmd = () => {
		return new Promise( ( resolve, reject ) => {
			
			cmd( "stylelint",
			     `"**/*.css" --configure ./conf/stylelint.config.js --ignore-path ./conf/stylelint.ignore  --allow-empty-input --quiet --cache --color --fix --formatter tap --output-file ${ paths.resolve(
			       [ paths.dirReportsStylelint, "index.tap" ] ) } --risd --rdd --rd`
			)
			  .then( response => {return resolve( response );} )
			  .catch( error => {return reject( error );} );
			
		} );
	};
};
