var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry:   [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './client/src/main'
  ],
  output:  {
    path:       path.join(__dirname, '_dist'),
    filename:   'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module:  {
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client/src')
      },
      {
        test:    /\.js?$/,
        include: path.join(__dirname, 'client/src'),
        loader:  'eslint'
      },
      {
        test:   /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};

