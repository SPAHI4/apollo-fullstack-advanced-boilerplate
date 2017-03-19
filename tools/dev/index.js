// this file will run from babel-node
import chalk from 'chalk';

import '../log';
import config from '../../config';

// import dllCompiler from './dllCompiler';
import backendServer from './backendServer';
import FrontendServer from './frontendServer';
import frontendConfig from '../webpack/config.client';

const frontendServer = new FrontendServer(frontendConfig);

frontendServer.onFirstBuild = () => {
	console.log(`Developer server started:
	==> ${chalk.cyan(`https://localhost:${config.port}`)}
`);
};
