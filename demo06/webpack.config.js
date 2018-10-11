var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
module.exports = {
	entry: {app:__dirname + '/src/scripts/index'},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'script/[name]_[chunkhash:5].js',
		publicPath: '../'
	},
	resolve: {
		extensions: ['.js', '.json', '.scss', '.css'],
	},
	module: {
		rules: [{
			test: /\.css$/,
			// use: ['css-loader', MiniCssExtractPlugin.loader]
			use: [MiniCssExtractPlugin.loader, 'css-loader']
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
			loader: 'html-withimg-loader'
		}]
	},
	plugins: [
		// 自动生成index.html文件
		new HtmlWebpackPlugin({
			title: 'webpack标题',
			filename: 'view/index.html',
			template: __dirname + '/src/views/index.html'
		}),
		// 提取的CSS指定到目标文件夹下的style文件夹下面
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
			chunkFilename: "styles/[id].css"
		}),
		new CleanWebpackPlugin(['dist'])
	]
}