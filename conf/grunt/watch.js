module.exports = {
  node_modules: {
    files: [
      "node_modules/",
      "**/node_modules/",
      "*/node_modules/",
      "./**/*/node_modules/",
    ],
    tasks: ["run:update:lerna"],
  },
  /*readme: {
    files: ["conf/templates/README.md.hbs"],
    tasks: ["writefile:readme"],
  },
  gruntfile: {
    files: "<%= jshint.gruntfile.src %>",
    tasks: ["jshint:gruntfile"],
  },
  lib: {
    files: "<%= jshint.lib.src %>",
    tasks: ["jshint:lib", "nodeunit"],
  },
  test: {
    files: "<%= jshint.test.src %>",
    tasks: ["jshint:test", "nodeunit"],
  },*/
  /*submodules: {
    run: {
      files: ".run/!**!/!*",
      tasks: ["github:push:run", "github:update:run"],
    },
    github: {
      files: ".github/!**!/!*",
      tasks: ["github:push:github", "github:update:github"],
    },
    conf: {
      files: "conf/!**!/!*",
      tasks: ["github:push:conf", "github:update:conf"],
    },
  },*/
  /*docs: {
    files: "docs/!**!/!*",
    tasks: ["writefile"],
  },*/
};
