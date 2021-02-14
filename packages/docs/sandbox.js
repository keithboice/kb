const MakeDocs = require( './index.js' );
const GetPaths = require( '../../../../packages/paths' );

/*
 * Test package readme
 */
const makeDocs = new MakeDocs( 'package', __dirname );
const getPaths = new GetPaths( 'package', __dirname );

console.log( getPaths.fileReadme.templateFile );

makeDocs.handler( `${ getPaths.fileReadme.file }`, `${ getPaths.fileReadme.templateFile }` )
  .then( result => {
	  console.log( `result: ${ JSON.stringify( result ) }` );
  } )
  .catch( err => console.error( 'error: ' + JSON.stringify( err ) ) );
