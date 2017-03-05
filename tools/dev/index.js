import Webpack from 'webpack';
import koaWebpack from 'koa-webpack';

import { app } from '../../server/app';
import config from '../webpack/config.client';

const compiler = Webpack(config);

const middleware = koaWebpack({
	compiler,
});

app.use(middleware);
