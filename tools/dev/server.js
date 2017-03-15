import Webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import path from 'path';

import { app, server } from '../../server/app';
import config from '../../config';
import webpackConfig from '../webpack/config.client';

server.listen(config.port, () => {
	console.log(`dev server is running on port ${config.port}`);
});

const compiler = Webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const middleware = koaWebpack({
	compiler,
	dev: {
		stats: {
			colors: true
		},
		serverSideRender: false,
	}
});


app.use(middleware);
