const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],

  resolve: {
    extensions: ["", ".js", ".jsx", ".css"],
  },

  devServer:{
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, "src")),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader'),
      },
      { 
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
    ],
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-color-rebeccapurple'),
  ],
  eslint: {
    configFile: '.eslintrc',
  },
};

module.exports = config;