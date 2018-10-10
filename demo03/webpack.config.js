var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
module.exports = {
	// entry: __dirname + '/src/script/app.js',
	entry:{
		app:__dirname + '/src/script/app.js',
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'script/[name].js',
		publicPath: "../"
	},
	resolve: {
		extensions: ['.js', '.json', '.scss', '.css'],
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			}, 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]']
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'img/[name].[hash:5].[ext]'
				}
			}]
		}, {
			test: /\.(htm|html)$/i,
			use: ['html-withimg-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'webpack标题',
			filename: 'views/index.html',
			template: __dirname + '/src/views/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
			chunkFilename: "styles/[id].css"
		}),
		new CleanWebpackPlugin(['dist']),
	]
}