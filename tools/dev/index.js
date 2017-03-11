import Webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import path from 'path';

import { app } from '../../server/app';
import config from '../webpack/config.client';

const compiler = Webpack(config);
// compiler.apply(new DashboardPlugin());

const middleware = koaWebpack({
	compiler
});

app.use(middleware);
