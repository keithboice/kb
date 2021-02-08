"use strict";

const {
	rollup: { rollup },
} = require("rollup");
const resolve = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs ");
const localResolve = require("rollup-plugin-localResolve-resolve");
const compiler = require("@ampproject/rollup-plugin-closure-compiler");
const uglify = require("rollup-plugin-uglify");
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

/**
 * Default rollup config for nodejs kb projects.
 * @module @kb/cmd-build-node
 * @example
 * const configRollupNode = require('@kb/config-rollup-node')
 * rollup --config node:configRollupNode
 */

const main = {
	input: "src/index.js", // our source file
	output: [
		{
			dir: "dist",
			file: pkg.main,
			format: "cjs",
		},
		{
			dir: "dist",
			file: pkg.module,
			format: "es", // the preferred format
		},
		{
			dir: "dist",
			file: pkg.browser,
			format: "iife",
			name: pkg.name, // the global which can be used in a browser
		},
	],
	external: [...Object.keys(pkg.dependencies || {})],
	plugins: [resolve(), cjs(), localResolve(), compiler(), uglify(), terser()],
};

const bin = {
    input: "src/cli.js", // our source file
    output: [
        {
            dir: "dist",
            file: "cli.js",
            format: "cjs",
        },
        {
            dir: "dist",
            file: "cli.mjs",
            format: "es", // the preferred format
        },
        {
            dir: "dist",
            file: "cli.iife.js",
            format: "iife",
            name: pkg.name,
        },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [resolve(), cjs(), localResolve(), compiler(), uglify(), terser()],
};

module.exports = { main, bin};
