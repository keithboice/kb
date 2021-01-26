module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks ('grunt-writefile');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks ('grunt-eslint');
	grunt.loadNpmTasks ('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks ('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha-istanbul')
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks ('grunt-contrib-watch');
	grunt.loadNpmTasks ('grunt-nodemon');
	grunt.loadNpmTasks ('grunt-jsdoc');

	grunt.initConfig ({
		                  pkg: grunt.file.readJSON ('package.json'),
		                  concat: {
			                  options: {
				                  separator: ';'
			                  },
			                  dist: {
				                  src: ['src/**/*.js'],
				                  dest: 'dist/<%= pkg.name %>.js'
			                  }
		                  },
		                  htmlmin: {                                     // Task
			                  dist: {                                      // Target
				                  options: {                                 // Target options
					                  removeComments: true,
					                  collapseWhitespace: true
				                  },
				                  files: {                                   // Dictionary of files
					                  'dist/index.html': 'src/index.html',     // 'destination': 'source'
					                  'dist/contact.html': 'src/contact.html'
				                  }
			                  },
			                  dev: {                                       // Another target
				                  files: {
					                  'dist/index.html': 'src/index.html',
					                  'dist/contact.html': 'src/contact.html'
				                  }
			                  }
		                  },
		                  cssmin: {
			                  target: {
				                  files: [{
					                  expand: true,
					                  cwd: 'release/css',
					                  src: ['*.css', '!*.min.css'],
					                  dest: 'release/css',
					                  ext: '.min.css'
				                  }]
			                  }
		                  },
		                  uglify: {
			                  options: {
				                  banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			                  },
			                  dist: {
				                  files: {
					                  'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				                  }
			                  }
		                  },
		                  watch: {
			                  configFiles: {
				                  files: ['gruntfile.js', 'config/*.js'],
				                  options: {
					                  reload: true
				                  }
			                  },
			                  js: {
				                  files: ['**/*.js'],
				                  tasks: ['watch'],
				                  options: {
					                  spawn: false
				                  }
			                  },
			                  templates: {
				                  files: ['**/*.hbs'],
				                  tasks: ['writefile']
			                  }
		                  },
		                  csslint: {
			                  strict: {
				                  options: {
					                  import: 2
				                  },
				                  src: ['**/*.css']
			                  },
			                  lax: {
				                  options: {
					                  import: false
				                  },
				                  src: ['**/*.css']
			                  }
		                  },
		                  eslint: {
			                  options: {
								configFile: "config/.eslintrc"
			                  },
			                  target: ['*.js']
		                  },
		                  jshint: {
			                  files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			                  options: {
				                  // options here to override JSHint defaults
				                  globals: {
					                  jQuery: true,
					                  console: true,
					                  module: true,
					                  document: true
				                  }
			                  }
		                  },
		                  clean: {
			                  coverage: {
				                  src: ['coverage/']
			                  }
		                  },
		                  copy: {
			                  coverage: {
				                  src: ['test/**'],
				                  dest: 'coverage/'
			                  }
		                  },
		                  qunit: {
			                  files: ['test/**/*.html']
		                  },
		                  mochaTest: {
			                  test: {
				                  options: {
				                  	    configFile: "config/.mocharc.yml",
				                  },
				                  src: ['**/*.spec.js']
			                  },
			                  coverage: {
				                  options: {
					                  reporter: 'html-cov',
					                  quiet: true,
					                  captureFile: 'coverage.html'
				                  },
				                  src: ['/coverage/test/**/*.js']
			                  },
			                  'travis-cov': {
				                  options: {
					                  reporter: 'travis-cov'
				                  },
				                  src: ['/coverage/test/**/*.js']
			                  }
		                  },
		                  mocha_istanbul: {
			                  coverage: {
				                  src: 'test', // a folder works nicely
				                  options: {
					                  configFile: "config/.mocharc.yml",
					                  mask: '*.spec.js'
				                  }
			                  },
			                  coverageSpecial: {
				                  src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
				                  options: {
					                  coverageFolder: 'coverageSpecial',
					                  mask: '*.spec.js',
					                  mochaOptions: ['--harmony','--async-only'], // any extra options
					                  istanbulOptions: ['--harmony','--handle-sigint']
				                  }
			                  },
			                  coveralls: {
				                  src: ['test', 'testSpecial', 'testUnique'], // multiple folders also works
				                  options: {
					                  coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
					                  check: {
						                  lines: 75,
						                  statements: 75
					                  },
					                  root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
					                  reportFormats: ['cobertura','lcovonly']
				                  }
			                  }
		                  },
		                  istanbul_check_coverage: {
			                  default: {
				                  options: {
					                  coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
					                  check: {
						                  lines: 80,
						                  statements: 80
					                  }
				                  }
			                  }
		                  },
		                  nodemon: {
			                  dev: {
				                  script: 'start.js'
			                  }
		                  },
		                  jsdoc: {
			                  dist: {
				                  src: ['src/*.js', 'test/*.js'],
				                  options: {
					                  destination: 'docs'
				                  }
			                  }
		                  },
		                  writefile: {
			                  options: {
				                  data: {
					                  foo: 1,
					                  bar: 2
				                  }
			                  },
			                  main: {
				                  src: 'README.md.hbs',
				                  dest: 'README.md'
			                  }
		                  },
		                  imagemin: {
			                  static: {
				                  options: {
					                  optimizationLevel: 3,
				                  },
				                  files: {
					                  'dist/img.png': 'src/img.png',
					                  'dist/img.jpg': 'src/img.jpg',
					                  'dist/img.gif': 'src/img.gif'
				                  }
			                  },
			                  dynamic: {
				                  files: [{
					                  expand: true,
					                  cwd: 'src/',
					                  src: ['**/*.{png,jpg,gif}'],
					                  dest: 'dist/'
				                  }]
			                  }
		                  }
	                  });

	// On watch events, if the changed file is a test file then configure mochaTest to only
	// run the tests from that file. Otherwise run all the tests
	var defaultTestSrc = grunt.config ('mochaTest.test.src');

	grunt.event.on('watch', function(action, filepath) {
		grunt.config('mochaTest.test.src', defaultTestSrc);
		if (filepath.match('test/')) {
			grunt.config('mochaTest.test.src', filepath);
		}
	});

	grunt.event.on('coverage', function(lcov, done){
		require('coveralls').handleInput(lcov, function(err){
			if (err) {
				return done(err);
			}
			done();
		});
	});

	grunt.registerTask ('readme', ['writefile']);
	grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
	grunt.registerTask ('watch', ['eslint', 'jshint', 'qunit', 'mochaTest']);
	grunt.registerTask('test', ['clean', 'copy', 'qunit', 'mochaTest']);
	grunt.registerTask('frontend', [ 'csslint', 'imagemin', 'concat', 'htmlmin', 'cssmin', 'uglify']);
	grunt.registerTask ('default', ['clean', 'copy', 'csslint', 'eslint', 'jshint', 'qunit', 'mochaTest', 'concat', 'imagemin', 'htmlmin', 'cssmin', 'uglify', 'jsdoc' ]);
};