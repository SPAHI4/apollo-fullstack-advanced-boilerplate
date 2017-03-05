import prodConfig from './config.client.prod';
import devConfig from './config.client.dev';

const DEV = process.env.NODE_ENV !== 'production';

const baseConfig = {

};

const config = DEV ? devConfig : prodConfig;

export default {
	...baseConfig,
	...config,
};
