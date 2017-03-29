import http2 from 'http2';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import minilog from 'minilog';
import logger from 'koa-logger';
import error from 'koa-json-error';

import compose from './utils/composeMiddleware';
import config from '../config';
import { securityLayer, serveLayer } from './middleware';
let graphqlLayer = require('./middleware/graphql').default;

const app = new Koa();
let server;

app
	.use(error())
	.use(securityLayer)
	.use((...args) => graphqlLayer(...args)) // hot reload
	.use(serveLayer); // We use serve after graphql to allow access to GET /graphiql

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt'),
};


const { createServer } = (config.http2.enabled ? http2 : https);
server = createServer(options, app.callback());

new SubscriptionServer({
	subscriptionManager: {},
}, {
	server,
	path: '/',
});

server.on('close', () => {
	server = undefined;
});

export { app, server };

if (module.hot) {
	module.hot.accept();
}

/*

if (module.hot) {
	console.log('hmr enabled');
	try {
		module.hot.dispose(() => {
			if (server) {
				server.close();
			}
		});

		module.hot.accept('./middleware/graphql', () => {
			console.log('updating graphql...');
			graphqlLayer = require('./middleware/graphql').default;
		});

	} catch (err) {
		console.error(err.stack);
	}
}
*/
