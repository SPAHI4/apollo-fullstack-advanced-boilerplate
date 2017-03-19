import webpack from 'webpack';
import SplittingManifestPlugin from 'webpack-splitting-manifest-plugin';

export default  {
	plugings: [
		new SplittingManifestPlugin(),
		new webpack.optimize.AggressiveSplittingPlugin({
			minSize: 30000,
			maxSize: 50000
		}),
	]
};
