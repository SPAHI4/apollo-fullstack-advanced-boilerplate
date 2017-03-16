import { app, server } from './app';
import config from '../config';

server.listen(config.port, () => {
	console.log(`server is running on port ${config.port}`);
});

