import webpack from 'webpack';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import minilog from 'minilog';

import config from '../../config';
import webpackConfig from '../webpack/config.client';
import getHtml from './getHtml';

const options = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt'),
};
const compiler = webpack(webpackConfig);

class FrontendServer {

	firstBuild = false

	constructor(wconfig) {
		this.compiler = webpack(wconfig);
		this.startDevServer();
		this.logger = minilog('webpack:frontend');
		this.compiler.plugin('compile', (stats) => {
			this.logger.info('Building frontend...');
		});
		this.compiler.plugin('done', (stats) => {
			debugger;
			if (stats.hasErrors()) {
				this.logger.error('Frontend build failed:');
				this.logger.error(stats.toString({
					colors: true
				}));
			} else if (!this.firstBuild) {
				this.logger.info('Frontend ready!');
				this.firstBuild = true;
				// fs.writeFileSync(`${wconfig.output.path}/index.html`, getHtml(stats.compilation.assets, wconfig.output.publicPath));
				// console.log(getHtml(stats.compilation.assets));
				this.onFirstBuild && this.onFirstBuild(stats);
			} else {
				this.logger.info('rebuild completed');
			}
		});
	}

	startDevServer() {
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
			https: options,
			hot: true,
		}).listen(config.port);
	}

	start() {

	}

	dispose() {

	}
}

export default FrontendServer;
