import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cheerio from 'cheerio';

import config from '../../config';
import prodConfig from './config.client.prod';
import devConfig from './config.client.dev';

const DEV = process.env.NODE_ENV !== 'production';

const baseConfig = {
	target: 'web',
	context: process.cwd(),
	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

/*
		'webpack-dev-server/client?/__webpack_hmr',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
*/

		'./client/index.js',
	],
	output: {
		path: path.resolve(process.cwd(), 'build/client'),
		publicPath: '/',
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					babelrc: false,
					presets: [
						'react',
						'stage-3',
						['latest', { es2015: { modules: false } }],
					],
					plugins: [
						'react-hot-loader/babel',
						'transform-react-jsx-self',
						'transform-react-jsx-source',
					],
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { modules: true }
					},
				],
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader'
			}
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates,

		new HtmlWebpackPlugin({
			inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
			templateContent: getHtmlTemplate(), // eslint-disable-line no-use-before-define
		}),
	],
};

function getHtmlTemplate() {
	const html = fs.readFileSync(
		path.resolve(process.cwd(), 'client/index.html')
	).toString();

	return html;
}

const realConfig = DEV ? devConfig : prodConfig;

export default {
	...baseConfig,
	...realConfig,
};
