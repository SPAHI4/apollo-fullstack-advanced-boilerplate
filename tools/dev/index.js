// this file will run from babel-node
import chalk from 'chalk';

import '../log';
import config from '../../config';

// import dllCompiler from './dllCompiler';
import BackendServer from './backendServer';
import FrontendServer from './frontendServer';
import frontendConfig from '../webpack/config.client';
import backendConfig from '../webpack/config.server';

const frontendServer = new FrontendServer(frontendConfig);
const backendServer = new BackendServer(backendConfig);

frontendServer.onFirstBuild = () => {
	console.log(`Developer server started:
	==> ${chalk.cyan(`https://localhost:${config.port}`)}
`);
};
