// this file will run both from webpack and babel-node

import webpack from 'webpack';
import { spawn } from 'child_process';

import config from '../../config';
import serverConfig from '../webpack/config.server';

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

compiler.plugin('done', () => {
	serverStarted = true;
	if (server) {

	} else {
		runServer(config.path.backend);
	}
});

compiler.watch({}, (err, stats) => {

	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		return;
	}

	console.log(stats.toString({
		hash: false,
		version: false,
		timings: true,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: true,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: false,
		colors: true
	}));
});
