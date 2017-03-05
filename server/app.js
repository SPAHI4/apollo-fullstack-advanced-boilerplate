import Koa from 'koa';
import http2 from 'http2';
import fs from 'fs';

import config from '../config'

const app = new Koa();

app.use(ctx => {
	ctx.body = 'Hello Koa';
});

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt')
};


const server = http2.createServer(options, app.callback());

server.listen(config.port, () => {
	console.log('app is running')
});

export { app };
