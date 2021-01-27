module.exports = {
  add: {
    dependency: {
      cmd: "npx",
      args: ["lerna", "add", "--dev"],
      options: {
        passArgs: ["p"],
      },
    },
  },
  update: {
    lerna: {
      cmd: "npm",
      args: ["run", "lerna:update"],
    },
  },
};
