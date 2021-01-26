const path = require ('path');
const template = path.join(process.cwd(), 'README.md.hbs');
const output = path.join(process.cwd(), 'README.md');

const currentdate = new Date ();
const datetime = 'Last update: ' + currentdate.getDate () + '/'
                 + (currentdate.getMonth () + 1) + '/'
                 + currentdate.getFullYear () + ' @ '
                 + currentdate.getHours () + ':'
                 + currentdate.getMinutes () + ':'
                 + currentdate.getSeconds ();

module.exports = {
	readme: {
		options: {
			data: {
				REPOSITORY_SLUG: 'kb',
				REPOSITORY_DESCRIPTION: 'kb github repository',
				REPOSITORY_NAME: 'kb',
				date: datetime
			}
		},
		main: {
			src: template,
			dest: output
		}
	}
};