import webpack from 'webpack';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';

import config from '../../config';
import webpackConfig from '../webpack/config.client';
import log from '../log';

const devServer = new Koa();

const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const middleware = koaWebpack({
	compiler,
	dev: {
		stats: {
			colors: true
		},
		serverSideRender: false,
	},
});

devServer.use(middleware);

devServer.listen(config.webpackPort);
