import 'reflect-metadata';
import { createConnection } from 'typeorm';
import minilog from 'minilog';

import { User } from './entity';
// import {} from './repository';
// import {} from './subscriber';
import config from '../../config';

const logger = minilog('TypeORM');

let connection;

const connectionOptions = {
	driver: config.database,
	autoSchemaSync: process.env.IS_DEV,
	entities: [
		User
	],
	subscribers: [],
	logging: {
		logQueries: process.env.IS_DEV,
		logger: (level, message) => logger[level](message),
	},
};

export default async function getConnection() {
	return (connection && connection.isConnected) ? connection : createConnection(connectionOptions);
}
