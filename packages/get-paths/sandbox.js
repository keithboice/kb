const path = require( 'path' )
const Paths = require( './index.js' )

/*
 * Test package readme
 */
const paths = new Paths( 'package', path.resolve( '../' + __dirname ) )

console.log( `paths.fileReadme: ${ paths.fileReadme }` )

paths.approot

paths.resolve( 'make-docs' )

paths.clean( [ 'dist' ] )
	.then( response => console.log( response.code ) )

paths.getPackageJson()
	.then( response => console.log( response.code ) )

paths.getDirectories( '/Users/dkb/repos/working' )
	.then( response => console.log( response.code ) )

paths.filterDirectories( `**/package.json`, '/Users/dkb/repos/working' )
	.then( response => console.log( response.code ) )
