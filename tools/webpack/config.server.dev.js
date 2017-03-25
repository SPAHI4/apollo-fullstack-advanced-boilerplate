import webpack from 'webpack';

export default {
	plugins: [
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
