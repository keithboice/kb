module.exports = {
	plugins: ["unicorn", "node", "jest", "jest-formatting", "prettier"],
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"plugin:node/recommended",
		"plugin:jest/style",
		"plugin:jest-formatting/recommended",
		"plugin:jest/recommended",
		"prettier/unicorn",
		"prettier",
		"prettier/prettier",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	globals: {
		useTabs: true,
		noUnpublishedRequire: "off",
		semi: false,
		singleQuote: true,
		vueIndentScriptAndStyle: true,
		jsxSingleQuote: true,
	},
	settings: {
		jest: {
			version: 26,
		},
	},
	overrides: [
		{
			files: ["*.js", "*.cjs", "*.mjs"],
			plugins: ["unicorn", "node", "prettier"],
			extends: [
				"plugin:node/recommended",
				"prettier/unicorn",
				"prettier",
				"prettier/prettier",
				"plugin:prettier/recommended",
			],
		},
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint"],
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"prettier",
				"prettier/@typescript-eslint",
			],
		},
		{
			files: ["*.yaml", "*.yml"],
			plugins: ["yaml"],
			extends: ["plugin:yaml/recommended", "prettier", "prettier/prettier"],
		},
		{
			files: ["*.json"],
			plugins: ["json", "json-files"],
			extends: ["plugin:json/recommended", "prettier", "prettier/prettier", "plugin:prettier/recommended"],
			rules: {
				"json-files/no-branch-in-dependencies": 1,
				"json-files/require-engines": 1,
				"json-files/require-license": 1,
				"json-files/restrict-ranges": 1,
				"json-files/sort-package-json": 1,
			},
		},
	],
};
