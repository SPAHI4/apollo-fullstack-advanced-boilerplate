import appRoot from 'app-root-path';
import sharedConfig from './shared';

let currentConfig;

if (process.env.IS_CLIENT) {
	currentConfig = require('./client').default;
} else {
	currentConfig = require('./server').default;
}

const IS_DEV = process.env.NODE_ENV !== 'production';
const getConfigForEnv = ({ production, development, ...shared }) => ({
	...shared,
	...(IS_DEV ? development : production),
});

const config = {
	...getConfigForEnv(sharedConfig),
	...getConfigForEnv(currentConfig),
};

// Magically resolve path
if (config.path) {
	Object.keys(config.path).forEach(path => {
		config.path[path] = appRoot.resolve(config.path[path]);
	});
}

console.log(process.env.IS_CLIENT, config);

export default config;
