module.exports = {
	plugins: ["unicorn", "node", "prettier"],
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		"prettier/unicorn",
		"prettier",
		"prettier/prettier",
		"plugin:prettier/recommended",
		"plugin:node/recommended",
	],
	parserOptions: {
		ecmaVersion: 12,
	},
	globals: { useTabs: true },
};
