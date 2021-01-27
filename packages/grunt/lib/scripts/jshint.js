module.exports = {
  jshint: {
    options: {
      jshintrc: ".jshintrc",
    },
    gruntfile: {
      src: ".Gruntfile.js",
    },
    lib: {
      options: {
        jshintrc: "lib/.jshintrc",
      },
      src: ["lib/**/*.js"],
    },
    test: {
      src: ["test/**/*.js"],
    },
  },
};
