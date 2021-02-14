const path = require( "path" );

module.exports = {
	plugins:       [ "jest", "jest-formatting", "unicorn", "node", "prettier" ],
	env:           {
		shelljs: true,
		es6:     true,
		es2017:  true,
		es2020:  true,
		es2021:  true,
		jest:    true,
		node:    true
	},
	extends:       [
		"eslint:recommended",
		"plugin:jest/style",
		"plugin:jest-formatting/recommended",
		"plugin:jest/recommended",
		"prettier/unicorn",
		"prettier",
		"prettier/prettier",
		"plugin:prettier/recommended",
		"plugin:node/recommended"
	],
	parser:        "@babel/eslint-parser",
	parserOptions: {
		ecmaVersion:  2020,
		babelOptions: {
			configFile: path.resolve( __dirname, "babel.config.json" )
		}
	},
	rules:         {
		strict:                         0,
		"no-console":                   1,
		"no-unpublished-require":       0,
		"node/no-unpublished-require":  0,
		"node/no-unpublished-bin":      1,
		"jest/valid-expect-in-promise": 0,
		"valid-jsdoc":                  [
			2, {
				requireReturnType: true,
				requireParamType:  true
			}
		]
	},
	settings:      {
		jest: {
			version: 26
		}
	},
	overrides:     [
		{
			files:   [ "*.ts", "*.tsx" ],
			parser:  "@typescript-eslint/parser",
			plugins: [ "@typescript-eslint" ],
			extends: [
				"eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"
			]
		}, {
			files:   [ "*.yaml", "*.yml" ],
			plugins: [ "yaml" ],
			extends: [ "plugin:yaml/recommended", "prettier", "prettier/prettier" ]
		}, {
			files:   [ "*.json" ],
			plugins: [ "json", "json-files" ],
			extends: [ "plugin:json/recommended", "prettier", "prettier/prettier", "plugin:prettier/recommended" ],
			rules:   {
				"json-files/no-branch-in-dependencies": 1,
				"json-files/require-engines":           1,
				"json-files/require-license":           1,
				"json-files/restrict-ranges":           1,
				"json-files/sort-package-json":         1
			}
		}
	]
};
