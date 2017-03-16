export default {
	commonValue: 'foo',

	development: {
		port: 1488,
		webpackPort: 1337,
		database: {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'admin',
			database: 'test',
		},
	},
	production: {
		port: 8080,
		database: {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'admin',
			database: 'test',
		},
	},
}
