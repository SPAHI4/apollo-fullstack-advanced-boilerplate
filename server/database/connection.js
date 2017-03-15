import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity';
// import {} from './repository';
// import {} from './subscriber';

import config from '../../config';
import log from '../../tools/log';

let connection;

const connectionOptions = {
	driver: config.database[process.env.IS_PROD ? 'production' : 'development'],
	autoSchemaSync: process.env.IS_DEV,
	entities: [
		User
	],
	subscribers: [],
	logging: {
		logQueries: process.env.IS_DEV,
		log: log('TYPEORM')
	},
};

export default async function getConnection() {
	return (connection && connection.isConnected) ? connection : createConnection(connectionOptions);
}
