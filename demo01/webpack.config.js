var path=require("path");
module.exports = {
  entry: './src/js/app.js',
  output: {
  	path: path.resolve(__dirname, "build",'assets'),
    filename: 'bundle_[chunkhash:5].js',
    publicPath:"/assets/"
  }
}