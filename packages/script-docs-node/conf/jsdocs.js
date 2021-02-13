'use strict'

const path = require( 'path' )
const appRootPath = require( 'app-root-path' )
	.toString()
const GetPaths = require( 'get-paths' )
const getPaths = new GetPaths( 'package', appRootPath )
const templatePath = getPaths.getJSDocTemplate( appRootPath )
const destPath = path.join( `${ appRootPath }`, 'docs', 'documentation', 'backend', 'html' )

//const pkg = require("./package.json");

/**
 * Default jsdoc config for nodejs kb projects.
 *
 * @example
 *   typeof require('@kb/script-docs-node') === 'object'
 *   => true
 *
 * @module @kb/script-docs-node
 */
module.exports = {
	plugins:      [ 'plugins/markdown' ],
	recurseDepth: 10,
	source:       {
		'include':        [ `${ appRootPath }` ],
		'includePattern': '.+\\.js(doc|x)?$',
		'exclude':        [ '.pnpm-store/', 'node_modules/', '.rush', 'docs', 'dist', 'build', 'example', 'theme/' ],
		'excludePattern': '(^|\\/|\\\\)_|pnpm-store|node_modules|\-lock\.'
	},
	'sourceType': 'module',
	'tags':       {
		'allowUnknownTags': true,
		'dictionaries':     [ 'jsdoc', 'closure' ]
	},
	
	'templates': {
		'cleverLinks':    true,
		'monospaceLinks': true,
		'referenceTitle': 'My SDK Name',
		'disableSort':    false,
		'collapse':       true,
		'resources':      {
			'google': 'https://www.google.com/'
		}
	},
	'opts':      {
		'template':    templatePath,  // same as -t templates/default
		'encoding':    'utf8',               // same as -e utf8
		'destination': destPath,          // same as -d ./out/
		'recurse':     true                  // same as -r
		//"tutorials":   "/Users/dkb/repos/working/docs/documentation/tutorials", // same as -u path/to/tutorials
	}
}
