import http2 from 'http2';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import compose from 'koa-compose';

import config from '../config';
import { security, graphql, serve } from './middleware';

const app = new Koa();

app.use(bodyParser());
app.use(compose(security));
app.use(compose(serve));
app.use(compose(graphql));

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt')
};

const { createServer } = (config.http2.enabled ? http2 : https);
const server = createServer(options, app.callback());

new SubscriptionServer({
	subscriptionManager: {},
}, {
	server,
	path: '/',
});

export { app, server };
