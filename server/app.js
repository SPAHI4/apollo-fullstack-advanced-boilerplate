import http2 from 'http2';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import compose from 'koa-compose';
import Router from 'koa-router';

import config from '../config';
import { security, graphql, serve } from './middleware';

const app = new Koa();
const router = new Router();

app
	.use(bodyParser())
	.use(compose(security))
	.use(compose(serve))
	.use(compose(graphql))
	.use(router.routes())
	.use(router.allowedMethods());

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

export { app, router, server };
