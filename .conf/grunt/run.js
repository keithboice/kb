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
  modified: {
    dependency: {
      cmd: "npm",
      args: ["run", "modified:dependency"],
    },
    js: {
      cmd: "npm",
      args: ["run", "modified:js"],
    },
  },
  repo: {
    conf: {
      options: {
        failOnError: true,
      },
      exec: "cd ./.conf && git add . && git commit -m 'automated update' && git push -f origin main",
    },
    github: {
      options: {
        failOnError: true,
      },
      exec: "cd ./.github && git add . && git commit -m 'automated update' && git push -f origin main",
    },
    idea: {
      options: {
        failOnError: true,
      },
      exec: "cd ./.idea && git add . && git commit -m 'automated update' && git push -f origin main",
    },
    run: {
      options: {
        failOnError: true,
      },
      exec: "cd ./.run && git add . && git commit -m 'automated update' && git push -f origin main",
    },
    docs: {
      options: {
        failOnError: true,
      },
      exec: "cd ./docs && git add . && git commit -m 'automated update' && git push -f origin main",
    }
  }
};
