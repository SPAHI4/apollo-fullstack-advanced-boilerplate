import 'reflect-metadata';
import { createConnection } from 'typeorm';
import minilog from 'minilog';

import { User, Post } from './entity';
// import {} from './repository';
// import {} from './subscriber';
import config from '../../config';

const logger = minilog('TypeORM');

let connection;

const connectionOptions = {
	driver: config.database,
	autoSchemaSync: process.env.IS_DEV,
	entities: [
		User,
		Post,
	],
	subscribers: [],
	logging: {
		logQueries: process.env.IS_DEV,
		logger: (level, message) => logger[level](message),
	},
};

export default async function getConnection() {
	return (connection && connection.isConnected)
		? Promise.resolve(connection)
		: createConnection(connectionOptions).then((newConnection) => {
			connection = newConnection;
			return connection;
		});
}
