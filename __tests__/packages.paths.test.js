'use strict'
const path = require( 'path' )
const Paths = require( './index.js' )

/*
 * Test package readme
 */
const paths = new Paths( 'package', path.resolve( '../' + __dirname ) )

/**
 * @test
 */
test( 'readme be an object', () => {
	expect( typeof paths.fileReadme )
		.toBe( 'object' )
} )

test( 'approot should be a string', () => {
	expect( typeof paths.approot )
		.toBe( 'string' )
} )

test( 'resolve should return a string', () => {
	expect( typeof paths.resolve( 'make-docs' ) )
		.toBe( 'string' )
} )

test( 'clean should return a ', () => {
	
	paths.clean( [ '/Users/dkb/repos/working/!**!/dist' ] )
		.then( response => {
			
			expect( response.code )
				.toBe( 200 )
		} )
	
} )

test( 'paths.getPackageJson() should return code 200', () => {
	
	paths.getPackageJson()
		.then( response => {
			
			expect( response.code )
				.toBe( 200 )
		} )
} )

test( 'paths.getDirectories should return code 200', () => {
	paths.getDirectories
		.then( response => {
			expect( response.code )
				.toBe( 200 )
		} )
} )

test( 'paths.filterDirectories should return code 200', () => {
	paths.filterDirectories
		.then( response => {
			expect( response.code )
				.toBe( 200 )
		} )
} )
