import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-node-polyfills";
import pkg from "./package.json";

export default [
	// index
	{
		input: "src/index.js",
		output: [
			{ file: "dist/index.mjs", format: "es", name: "index" },
			{ file: "dist/index.cjs", format: "cjs", exports: "named" },
			{ file: "dist/index.js", format: "cjs", exports: "named" },
		],
		plugins: [
			commonjs(), // so Rollup can convert `ms` to an ES module
			nodePolyfills(),
			nodeResolve({ preferBuiltins: false }),
		],
	},
	// main
	{
		input: "src/main.js",
		external: [...Object.keys(pkg.dependencies), "fs", "path", "os", "util", "url", "handlebars"],
		output: [
			{ file: "dist/main.cjs", format: "cjs", exports: "named" },
			{ file: "dist/main.js", format: "cjs", exports: "named" },
		],
		plugins: [
			commonjs(), // so Rollup can convert `ms` to an ES module
			nodePolyfills(),
			nodeResolve({ preferBuiltins: false }),
		],
	},
	{
		input: "src/cli.js",
		external: ["commander"],
		output: [
			{ file: "bin/cli.cjs", format: "cjs", exports: "named" },
			{ file: "bin/cli.js", format: "cjs", exports: "named" },
		],
		plugins: [
			commonjs(), // so Rollup can convert `ms` to an ES module
			nodePolyfills(),
			nodeResolve({ preferBuiltins: false }),
		],
	},
];

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
/*const production = !process.env.ROLLUP_WATCH;

 export default {
 input: 'src/main.js',
 output: {
 file: 'public/bundle.js',
 format: 'iife', // immediately-invoked function expression — suitable for <script> tags
 sourcemap: true
 },
 plugins: [
 resolve(), // tells Rollup how to find date-fns in node_modules
 commonjs(), // converts date-fns to ES modules
 production && terser() // minify, but only in production
 ]
 };*/
