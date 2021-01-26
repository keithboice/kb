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
      projectDirectory: process.cwd(),
      readmeTemplatePath: path.join(process.cwd(), 'conf', 'templates', 'README.md.hbs'),
      readmePath: path.join(process.cwd(), 'README.md'),
      pkg: grunt.file.readJSON(path.join(process.cwd(), 'package.json')),
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    },

    // use different function to merge config files
    mergeFunction: require('recursive-merge'),

    // can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    loadGruntTasks: {
      projectDirectory: '<%= projectDirectory %>',
      pkg: '<%= pkg %>',
      banner: '<%= banner %>',
      stripBanners: true,
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    },

    //can post process config object before it gets passed to grunt
    //postProcess: function(config) {},

    //allows to manipulate the config object before it gets merged with the data object
    preMerge: function(config, data) {}
  });

};