import webpack from 'webpack';
import fs from 'fs';
import chalk from 'chalk';
import minilog from 'minilog';
import { spawn } from 'child_process';
import ora from 'ora';

import config from '../../config';

class BackendServer {

	isFirstBuild = true
	serverProcess;

	constructor(webpackConfig) {
		this.compiler = webpack(webpackConfig);
		this.logger = minilog('webpack:backend');
		this.compiler.plugin('compile', this.onCompileStart);
		this.compiler.plugin('done', this.onCompileDone);
		this.watcher = this.compiler.watch(null, () => undefined);
	}

	startServer() {
		this.serverProcess = spawn('inspect', [config.path.backend], { stdio: 'inherit' });
	}

	onCompileStart = () => {
		if (this.isFirstBuild) {
			// this.logger.log('Building backend...');
			this.status = ora('Compiling backend...').start();
		} else {
			this.logger.debug('rebuilding backend...');
		}
	}

	onCompileDone = (stats) => {
		if (stats.hasErrors()) {
			this.status(false);
			// this.logger.error('Backend build failed:');
			this.status.fail('Backend build failed:');
			this.logger.error(stats.toString({
				colors: true,
			}));
		} else if (this.isFirstBuild) {
			// this.logger.log('Backend ready!');
			this.status.succeed('Backend ready!');
			this.isFirstBuild = false;
			!this.serverProcess && this.startServer();
			this.onFirstBuild && this.onFirstBuild(stats);
		} else {
			this.logger.debug('backend rebuilt');
		}
	}

	reload() {

	}

	dispose() {
		if (this.serverProcess) this.serverProcess.kill();
	}

}

export default BackendServer;
