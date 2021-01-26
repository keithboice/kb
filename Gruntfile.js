module.exports = function(grunt) {
  const path = require ('path');

  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'conf', 'grunt'),

    // path to project package.json file
    packageJsonPath: path.join(process.cwd(), 'package.json'),

    // auto grunt.initConfig
    init: true,

    // data passed into config.  Can use with <%= test %>
    data: {
      test: false
    },

    // use different function to merge config files
    mergeFunction: require('recursive-merge'),

    // can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    loadGruntTasks: {

      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    },

  });

};