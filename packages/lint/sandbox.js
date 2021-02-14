const path = require( 'path' );
const Lint = require( './' );

/*
 * Test package readme
 */
const lint = new Lint( path.resolve( __dirname ) );

console.table( Object.entries( lint ) );

console.log( `\nlint.prettierCmd(): ${ lint.prettierCmd() }\n` );

console.log( `\nlint.eslintCmd(): ${ lint.eslintCmd() }` );

console.log( `\nlint.stylelintCmd(): ${ lint.stylelintCmd() }` );
