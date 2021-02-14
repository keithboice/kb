module.exports = {
	plugins: [ 'stylelint-order' ],
	extends: [
		'stylelint-config-standard', 'stylelint-config-idiomatic-order', 'stylelint-order', 'stylelint-config-prettier'
	],
	rules:   {
		indentation: 'tab'
	}
};
