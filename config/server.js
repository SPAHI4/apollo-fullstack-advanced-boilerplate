export default {
	commonValue: 'foo',
	path: {
		frontend: 'build/client',
		backend: 'build/server',
		uploads: 'uploads',
	},
	development: {
		port: 1488,
		webpackPort: 1337,
		database: {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '',
			database: 'apollo-test',
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
