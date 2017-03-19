import { app, server } from './app';
import config from '../config';
import '../tools/log';

server.listen(process.env.IS_DEV ? config.proxyPort : config.port, () => {
	console.log(`server is running on port ${config.port}`);
});

