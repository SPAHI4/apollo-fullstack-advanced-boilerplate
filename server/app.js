import http2 from 'http2';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import minilog from 'minilog';
import logger from 'koa-logger';

import compose from './utils/composeMiddleware';
import config from '../config';
import { securityLayer, graphqlLayer, serveLayer } from './middleware';

const app = new Koa();
let server;

app
	.use(securityLayer)
	.use(serveLayer)
	.use(graphqlLayer);

// app.use(require('koa-static')(config.path.frontend));

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
	try {
		module.hot.dispose(() => {
			if (server) {
				server.close();
			}
		});

		module.hot.accept();

	} catch (err) {
		console.error(err.stack);
	}
}
