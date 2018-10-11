var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entryPath = path.join(__dirname, './scripts');
var outputPath = path.join(__dirname, './build');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	// entry: entryPath + '/index',
	// entry:[entryPath+"/app",entryPath+"/index"],//多入口数组用法，不建议使用
	entry: { //多入口对象用法
		index: entryPath + "/index",
		app: entryPath + "/app"

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
			minify:false,
			chunks: ['vendor','index','app'],
			chunksSortMode: function(chunk1,chunk2,chunk3){
				// var orders = [ 'vendor' , 'index' ,'app'];
				// var orders = [ 'vendor' , 'app' ,'index'];
				// var orders = [ 'index' , 'vendor' ,'app'];
				var orders = [ 'index' , 'app' ,'vendor'];
				// var orders = [ 'app' , 'index' ,'vendor'];
				// var orders = [ 'app' , 'vendor' ,'index'];
				var order1 = orders.indexOf(chunk1.names[0]);
				var order2 = orders.indexOf(chunk2.names[0]);
				return order1 - order2;
			},
		}),
		// 提取的CSS指定到目标文件夹下的style文件夹下面
		new ExtractTextPlugin("style/[name]-[chunkhash:5].css"),
		// 压缩JS
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			mangle: true
		}),
		// 提取公共文件
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minify: {
				collapseWhitespace: true
			},
			filename: 'scripts/[name]-[chunkhash:5].js'
		}),
	]
}