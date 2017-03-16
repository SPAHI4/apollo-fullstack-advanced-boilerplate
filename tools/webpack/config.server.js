import appRoot from 'app-root-path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import config from '../../config';
import prodConfig from './config.server.prod';
import devConfig from './config.server.dev';

const IS_DEV = process.env.NODE_ENV !== 'production';

const baseConfig = {
	target: 'node',
	devtool: 'sourcemap',
	context: appRoot.toString(),
	entry: [
		// 'webpack/hot/signal.js',
		'./server/index.js',
	],
	node: {
		__dirname: true,
		__filename: true,
	},
	output: {
		path: config.path.backend,
		filename: 'index.js',
	},
	externals: [nodeExternals()],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					babelrc: false,
					// presets: ['es2017-node7/webpack2'],
					plugins: [
						'syntax-trailing-function-commas',
						'transform-export-extensions',
						'transform-object-rest-spread',
						'transform-decorators',
						'transform-class-properties',
					],
				},
			},
			{
				test: /\.graphqls/,
				loader: 'raw-loader',
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.IS_DEV': JSON.stringify(IS_DEV),
			'process.env.IS_PROD': JSON.stringify(!IS_DEV),
		}),
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false
		}),
	],
};

const currentConfig = IS_DEV ? devConfig : prodConfig;

export default merge(baseConfig, currentConfig);
