// this file will run both from webpack and babel-node

import webpack from 'webpack';
import { spawn } from 'child_process';
import ora from 'ora';
import minilog from 'minilog';

import config from '../../config';
import serverConfig from '../webpack/config.server';
import WebpackReporter from '../webpack/reporter';


let server;
let serverStarted;

process.on('exit', () => {
	if (server) {
		server.kill('SIGTERM');
	}
});

function runServer(path) {
	if (serverStarted) {
		serverStarted = false;
		server = spawn('inspect', [path], { stdio: 'inherit' });
		server.on('exit', code => {
			if (code === 250) {
				// App requested full reload
				serverStarted = true;
			}
			console.log('Backend has been stopped');
			server = undefined;
			runServer(path);
		});
	}
}

const compiler = webpack(serverConfig);
const webpackReporter = new WebpackReporter(compiler, 'backend');

compiler.plugin('done', () => {
	serverStarted = true;
	console.log('DONE!');
	if (server) {

	} else {
		runServer(config.path.backend);
	}
});

compiler.watch({}, webpackReporter.reporter());

export default compiler;
