"use strict";

const { execSync } = require( "child_process" );
const CorePaths = require( "../../../../packages/paths" );
const corePaths = new CorePaths( "package" );
const appRoot = corePaths.approot;

/**
 * Code lint and clean utilities for nodejs projects.
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
    
    process.chdir( path );
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
    return new Promise( ( resolve ) => {
      const confEslint = "./conf/eslint.js";
      const confEslintIgnore = "./conf/eslint.ignore";
      
      return resolve( execSync(
        `npx eslint -c "${ confEslint }" --ignore-path "${ confEslintIgnore }" --cache --quiet --color --fix --output-file ${ corePaths.dirReportsEslint } .`,
        {
          cwd:   this._path,
          stdio: "inherit"
        }
      ) );
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
    return new Promise( ( resolve ) => {
      const confPrettier = "./conf/prettier.js";
      const confPrettierIgnore = "./conf/prettier.ignore";
      
      return resolve( execSync( `npx prettier -c "${ confPrettier }" --ignore-path "${ confPrettierIgnore }" --color --write .`, {
        cwd:   this._path,
        stdio: "inherit"
      } ) );
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
    return new Promise( ( resolve ) => {
      const confStylelint = "./conf/stylelint.js";
      const confStylelintIgnore = "./conf/stylelint.ignore";
      
      return resolve( execSync(
        `npx stylelint "**/*.css" --allow-empty-input --quiet --cache --config "${ confStylelint }" --color --fix --ignore-path "${ confStylelintIgnore }" --formatter tap --output-file ${ corePaths.resolve(
          [ corePaths.dirReportsStylelint, "index.tap" ] ) } --risd --rdd --rd`, {
          cwd:   this._path,
          stdio: "inherit"
        } ) );
    } );
  };
};
