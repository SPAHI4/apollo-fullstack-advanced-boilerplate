import appRoot from 'app-root-path';

// TODO: Here we need to return safe merged config for server or client

import clientConfig from './client';
import sharedConfig from './shared';
import serverConfig from './server';

const currentConfig = process.env.IS_SERVER ? serverConfig : clientConfig;

const config = {
	...sharedConfig,
	...currentConfig,
};

// Magically resolve path
if (config.path) {
	Object.keys(config.path).forEach(path => {
		config.path[path] = appRoot.resolve(config.path[path]);
	});
}

export default config;
