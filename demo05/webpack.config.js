var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var entryPath = path.join(__dirname, './scripts');
var outputPath = path.join(__dirname, './dist');
module.exports = {
	// entry: { //多入口对象用法
	// 	index: entryPath + "/index",
	// 	app: entryPath + "/app"
	// },
	entry: { //单入口对象用法
		index: entryPath + "/index",
		// app: entryPath + "/app"
	},
	output: {
		path: outputPath,
		filename: 'scripts/[name]-[chunkhash:5].js'
	},
	resolve: {
		extensions: ['.js', '.json', '.less', '.css', '.es'],
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}]
		}]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					chunks: "initial",
					name: "common",
					minChunks: 2,
					minSize: 0,
				}
			}
		}
	},
	plugins: [
		// 自动生成index.html文件
		new HtmlWebpackPlugin({
			title: 'webpackdemo2',
			filename: 'index.html',
			chunks: ['index', 'app', 'common'],
			chunksSortMode: function (chunk1, chunk2) {
				// var orders = [ 'vendor' , 'index' ,'app'];
				// var orders = [ 'vendor' , 'app' ,'index'];
				// var orders = [ 'index' , 'vendor' ,'app'];
				var orders = ['common', 'index', 'app'];
				// var orders = [ 'app' , 'index' ,'vendor'];
				// var orders = [ 'app' , 'vendor' ,'index'];
				var order1 = orders.indexOf(chunk1.names[0]);
				var order2 = orders.indexOf(chunk2.names[0]);
				return order1 - order2;
			},
		}),
		// 提取的CSS指定到目标文件夹下的style文件夹下面
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
			chunkFilename: "styles/[id].css"
		}),
		new CleanWebpackPlugin(['dist'])
	]
}