import 'reflect-metadata';
import { createConnection } from 'typeorm';
// import {} from './entity';
// import {} from './repository';
// import {} from './subscriber';

import config from '../../config';

const connectionOptions = {
	driver: config.database[process.env.IS_PROD ? 'production' : 'development'],
	autoSchemaSync: process.env.IS_DEV,
	entities: [],
	subscribers: [],
	logging: {
		logQueries: process.env.IS_DEV,
	},
};

