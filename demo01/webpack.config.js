var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, "dist", 'assets'),
		filename: 'bundle_[chunkhash:5].js',
		publicPath: "/assets/"
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
	],
}