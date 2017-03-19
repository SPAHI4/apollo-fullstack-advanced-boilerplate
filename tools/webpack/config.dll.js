import webpack from 'webpack';

import pkg from '../../package.json';

export default {
	target: 'web',
	entry: {
		vendor: Object.keys(pkg.dependencies),
	},
	plugins: [
		new webpack.optimize.AggressiveSplittingPlugin({
			minSize: 30000,
			maxSize: 50000
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	],
}
