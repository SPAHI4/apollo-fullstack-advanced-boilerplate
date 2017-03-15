export default {
	port: 1488,
	database: {
		production: {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'admin',
			database: 'test'
		},
		development: {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'admin',
			database: 'test'
		}
	}
}
