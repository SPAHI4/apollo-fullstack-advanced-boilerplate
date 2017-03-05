const Koa = require('koa');
const http2 = require('http2');
const fs = require('fs');
const koaWebpack = require('koa-webpack');

const app = new Koa();

app.use(ctx => {
	ctx.body = 'Hello Koa';
});

var options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt')
};


const server = http2.createServer(options, app.callback());

server.listen(8081, () => {
	console.log('app is running')
});
