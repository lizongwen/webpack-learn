var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');//不支持webpack4
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',
	//单入口文件
	//entry: __dirname + "/app/main.js",
	entry: {
		//多入口文件
		main1: __dirname + "/app/main1.js",
		main2: __dirname + "/app/main2.js"
	},
	output: {
		path: __dirname + "/dist",
		//单出口文件
		//filename: "bundle.js"
		//多出口文件
		//		filename: '[name].min.js',
		filename: '[name]_[hash:5].js',
		chunkFilename: '[name].[chunkhash:8].js'
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader
				}, 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]']

		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "My App",
			template: __dirname + "/app/index.tmpl.html",
			hash: true,
			chunks: ['main1', 'main2']
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				devServer: {
					contentBase: "./public",
					colors: true,
					historyApiFallback: true,
					inline: true,
					hot: true
				}
			}
		}),
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
			chunkFilename: "styles/[id].css"
		}),
		new CleanWebpackPlugin(['dist']),
	]
}