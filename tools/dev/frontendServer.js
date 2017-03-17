import webpack from 'webpack';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';

import config from '../../config';
import webpackConfig from '../webpack/config.client';
import WebpackReporter from '../webpack/reporter';

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt'),
};
const compiler = webpack(webpackConfig);

const webpackReporter = new WebpackReporter(compiler, 'frontend');

const devServer = new WebpackDevServer(compiler, {
	port: config.webpackPort,
	proxy: {
		'*': {
			publicPath: config.publicPath,
			headers: { 'Access-Control-Allow-Origin': '*' },
			target: 'https://localhost:1488',
			secure: false,
		},
	},
	https: options,
	reporter: webpackReporter.reporter(true),
	hot: true,
});

compiler.plugin('done', () => {
	console.log(`Developer server started:
	==> ${chalk.cyan(`https://localhost:${config.webpackPort}`)}
`);
});

devServer.listen(config.webpackPort);

export default devServer;
