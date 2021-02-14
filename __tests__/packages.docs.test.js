'use strict'

const Target = require( './index.js' )
const target = new Target( 'package', __dirname )

/**
 * @test
 */
test( 'target.handler should return code 200', () => {
	target.handler( 'readme_package', 'md' )
		.then( response => {
			expect( response.code )
				.toBe( 200 )
		} )
} )
