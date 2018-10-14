const webpack =require('webpack');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const setIterm2Badge = require('set-iterm2-badge');
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    join
} = require("path");
// setIterm2Badge("开发环境");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require("glob");
console.log("寻找文件", glob.sync(join(__dirname, './src/*.html')));
webpackConfig = {
	devServer:{
		port:3000,
		hot:true,
		before(app){
			app.get('/api/test',(req,resp)=>{
				resp.json({
					code:200,
					message:"hello world"
				})
			})
		}
	},
	optimization:{
		splitChunks:{
			cacheGroups:{
				commons:{
					chunks:"initial",
					name:"common",
					minChunks:1,
					maxInitialRequests:5,
					minSize:0
				}
			}
		},
		runtimeChunk:{
			name:'runtime'
		}
	},
    module: {
        rules: [{
            test: /\.css$/,
            use: [
				{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                // 'style-loader', 
                {
                    loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    // loader: 'css-loader'
                }
            ]
        }]
    },
    plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag?"styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename: _modeflag?"styles/[id].[hash:5].css":"styles/[id].css"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"src/index.html"
        }),
        new CleanWebpackPlugin(['dist']),
        // new PurifyCSSPlugin({
        //     paths: glob.sync(join(__dirname, './src/*.html')),
        // })
    ],
};
// module.exports = webpackConfig;
module.exports = merge(_mergeConfig, webpackConfig);