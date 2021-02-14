const path = require( 'path' )
const Builds = require( './index.js' )

/*
 * Test package readme
 */
const {
	      buildRollup
      } = new Builds( 'package' )

/*console.log( `builds.getDependencies: ${ getDependencies }` )
 
 console.log( `builds.rollup: ${ rollup }` )*/

const builder = buildRollup( '/Users/dkb/repos/kb/packages/paths/index.js' )
console.table( builder )
