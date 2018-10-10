var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path=require('path');
module.exports = {
	entry: __dirname + '/src/script/app.js',
	output: {
		path: path.resolve(__dirname, "build",'aaa'),
		filename: './script/[name]-[hash:5].js',
		publicPath:'aaa'
	},
	resolve: {
		extensions: ['.js', '.json', '.scss', '.css'],
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'img/[name].[hash:5].[ext]'
				}
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'webpack标题',
			filename: 'views/index.html',
			template: __dirname + '/src/views/index.html'
		}),
		new ExtractTextPlugin("./style/index.css")
	]
}