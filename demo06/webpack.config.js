var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entryPath = path.join(__dirname, './scripts');
var outputPath = path.join(__dirname, './dist');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	// entry:[entryPath+"/app.js",entryPath+"/index.js"],//多入口
	entry: { //多入口
		index: entryPath + "/index",
		app: entryPath + "/app"

	},
	output: {
		path: outputPath,
		filename: './scripts/[name]-[chunkhash:5].js'
	},
	resolve: {
		extensions: ['.js', '.json', '.less', '.css', '.es'],
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				// use:'css-loader!less-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true
					}
				}, {
					loader: 'less-loader',
				}]
			})
		}, {
			test: /\.es$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}]
	},
	plugins: [
		// 自动生成index.html文件
		new HtmlWebpackPlugin({
			title: 'webpackdemo2',
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			chunksSortMode: function(chunk1, chunk2) {
				var order = ['vendor', 'index', 'app'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		// 提取的CSS指定到目标文件夹下的style文件夹下面
		new ExtractTextPlugin("./style/[name]-[chunkhash:5].css"),
		// 压缩JS
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			mangle: true
		}), // 提取公共文件
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minify: {
				collapseWhitespace: true
			},
			filename: './scripts/[name]-[chunkhash:5].js'
		}),
	]
}