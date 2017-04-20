var path = require('path')
var webpack = require('webpack')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

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
    publicPath: '/fonts/'
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
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    // Images
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=../images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    // Fonts
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader'
      },
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
    commonsPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // The proxy option will serve the main ghost dev instance
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:2368'
    })
]
};
