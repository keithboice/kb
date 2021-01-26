module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-eslint");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    eslint: {
      options: {
        configFile: ".eslintrc.json",
      },
      target: ["*.js"],
    },
  });

  grunt.registerTask("clean", ["eslint"]);
};
