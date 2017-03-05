// TODO: Here we need to return safe merged config for server or client

import client from './client';
import shared from './shared';
import server from './server';

const config = process.env.IS_SERVER ? server : client;

export default {
	...shared,
	...config
}
