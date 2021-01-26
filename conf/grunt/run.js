module.exports = {
	add: {
		dependency: {
			cmd: 'npx',
			args: ['lerna', 'add', '--dev'],
			options: {
				passArgs: ['p'],
			},
		},
	},
	update: {
		lerna_links: {
			cmd: 'npx',
			args: ['lerna', 'link', 'convert'],
		},
	},
};