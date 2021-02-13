#!/usr/bin/env node

"use strict";

const path = require("path");
const appRoot = require("app-root-path").toString();
const modPath = path.resolve(appRoot, path.join(__dirname));
const conf = path.resolve(modPath, path.join("conf.js"));

console.log(`appRoot: ${appRoot}`);
console.log(`modPath: ${modPath}`);
console.log(`conf: ${conf}`);

/**
 * Command component of rollup library for kb projects.
 *
 * @example
 *   npm run build ./
 *   => 0
 *
 * @module @kb/script-build-node
 * @usasge $ "scripts": {
 *      "build": "build ./"
 * }
 */
const cmd = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("build", "Build the nodejs project", (cmd) => {
    console.log("\nrunning rollup from $s\n", cmd._);
    /**
     * Bundled rollup library config for kb projects.
     *
     * @class
     *
     * @module @kb/script-build-node
     */
    require("child_process").execSync(
      `npx rollup --config ${conf}`, // rollup --config src/conf.js
      { cwd: cmd._, stdio: "inherit" }
    );
    console.log("\nfinished running rollup\n");
  })
  .example("$0 build ./", "Builds the app from the repository root")
  .help("h")
  .alias("h", "help")
  .epilog("copyright 2021").argv;

console.log("\n\n", cmd);
