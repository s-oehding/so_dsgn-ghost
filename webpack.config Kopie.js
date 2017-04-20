var path = require('path')
var webpack = require('webpack')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: [
  	'./src/js/app.js',
  	'./src/scss/app.scss'
  ],
  devtool: 'eval',
  debug: true,
  output: {
    path: path.join(__dirname, 'assets/js'),
    filename: 'main.js',
    publicPath: '/static/'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.css']
  },
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loader: 'babel?presets[]=es2015',
      include: path.join(__dirname, 'src/js')
    },
    // SCSS
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass"),
      include: path.join(__dirname, 'src/scss')
    },
    // Images
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=../images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    // Fonts
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  postcss: function(webpack) {
    return [
      autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src/scss"),
      path.resolve(__dirname, "node_modules/foundation-sites/scss")
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new ProgressBarPlugin(),
    new ExtractTextPlugin('../css/styles.css'),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // The proxy option will serve the main ghost dev instance
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:2368'
    })
]
};
