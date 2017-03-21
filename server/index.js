import { app, server } from './app';
import config from '../config';
import '../tools/log';

let currentApp = app;

server.listen(process.env.IS_DEV ? config.proxyPort : config.port, () => {
	console.log(`server is running on port ${config.port}`);
});

if (module.hot) {
	module.hot.accept('./app', () => {
		console.log('server hot reloading...');
		server.removeListener('request', currentApp);
		server.on('request', app.callback());
		currentApp = app;
	});
}
