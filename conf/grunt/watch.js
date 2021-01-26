module.exports = {
	readme: {
		files: [
			'conf/templates/README.md.hbs'
		],
		tasks: ['writefile:readme']
	},
	gruntfile: {
		files: '<%= jshint.gruntfile.src %>',
		tasks: ['jshint:gruntfile']
	},
	lib: {
		files: '<%= jshint.lib.src %>',
		tasks: ['jshint:lib', 'nodeunit']
	},
	test: {
		files: '<%= jshint.test.src %>',
		tasks: ['jshint:test', 'nodeunit']
	},
};