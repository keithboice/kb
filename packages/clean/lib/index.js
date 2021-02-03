'use strict'

const eslint = require('./.eslintrc.js')
const stylelint = require('./.stylelintrc.js')
const prettier = require('./.prettierrc.js')

/**
 * Applies our various configs for linting and fixing code.
 * @module @kb/clean
 * @constructor
 */
module.exports.eslint = eslint
module.exports.stylelint = stylelint
module.exports.prettier = prettier
