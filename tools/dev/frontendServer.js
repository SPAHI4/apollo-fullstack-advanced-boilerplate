import webpack from 'webpack';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import minilog from 'minilog';
const ora = require('ora');

import config from '../../config';

class FrontendServer {

	isFirstBuild = true

	constructor(webpackConfig) {
		this.compiler = webpack(webpackConfig);
		this.logger = minilog('webpack:frontend');
		this.compiler.plugin('compile', this.onCompileStart);
		this.compiler.plugin('done', this.onCompileDone);
		this.startDevServer();
	}

	onCompileStart = () => {
		if (this.isFirstBuild) {
			// this.logger.log('Building frontend...');
			this.status = ora('Compiling frontend...').start();
		} else {
			this.logger.debug('rebuilding frontend...');
		}
	}

	onCompileDone = (stats) => {
		if (stats.hasErrors()) {
			// this.logger.error('Frontend build failed:');
			this.status.fail('Frontend build failed:');
			this.logger.error(stats.toString({
				colors: true,
			}));
		} else if (this.isFirstBuild) {
			// this.logger.log('Frontend ready!');
			this.status.succeed('Frontend ready!');
			this.isFirstBuild = false;
			this.onFirstBuild && this.onFirstBuild(stats);
		} else {
			this.logger.debug('frontend rebuilt');
		}
	}

	startDevServer() {
		const httpsOptions = {
			key: fs.readFileSync('./cert/localhost.key'),
			cert: fs.readFileSync('./cert/localhost.crt'),
		};
		this.devServer = new WebpackDevServer(this.compiler, {
			quiet: true,
			noInfo: true,
			stats: { colors: true },
			contentBase: config.path.frontend,
			proxy: {
				'*': {
					publicPath: config.publicPath,
					headers: { 'Access-Control-Allow-Origin': '*' },
					target: `https://localhost:${config.proxyPort}`,
					secure: false,
				},
			},
			https: httpsOptions,
			hot: true,
		}).listen(config.port);
	}

	dispose() {
		this.devServer.close();
	}

}

export default FrontendServer;
