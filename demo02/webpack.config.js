var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
		path: __dirname + "/public",
		//单出口文件
		//filename: "bundle.js"
		//多出口文件
//		filename: '[name].min.js',
		filename: '[name]_[hash:5].js',
		chunkFilename: '[name].[chunkhash:8].js'
	},
	module: {
		//		loaders: [{
		//			test: /\.json$/,
		//			loader: "json-loader"
		//		}, {
		//			test: /\.js$/,
		//			exclude: /node_modules/,
		//			loader: 'babel-loader',
		//			query: {
		//				presets: ['es2015', 'react']
		//			}
		//		}, {
		//			test: /\.css$/,
		//			loader: 'style-loader!css-loader?modules'
		//		}]
		rules: [{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader?modules"
		        })
//				use:ExtractTextPlugin.extract({
//		            use:['style-loader', 'css-loader?modules']
//		        })
//				use: [
//					'style-loader', 'css-loader?modules'
//				]
			}
		]
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
		new ExtractTextPlugin('styles_[hash:5].css'),
	]
}