import { createServer } from 'http2';
// import http from 'http';
import fs from 'fs';
import Koa from 'koa';
import serve from 'koa-static';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import config from '../config';

const app = new Koa();

app.use(serve('build/client'));

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt')
};


const server = createServer(options, app.callback());

server.listen(config.port, () => {
	console.log('app is running');

	new SubscriptionServer({
		subscriptionManager: {},
	}, {
		server,
		path: '/',
	});
});

export { app, server };
