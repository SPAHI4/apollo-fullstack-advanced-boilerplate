import prodConfig from './config.server.prod';
import devConfig from './config.server.dev';

const DEV = process.env.NODE_ENV !== 'production';

const baseConfig = {

}

const config = DEV ? devConfig : prodConfig;

export default {
	...baseConfig,
	...config
}
