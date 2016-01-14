const webpack = require('webpack');
const common = require('./webpack.config.common');

const devConfig = Object.assign({}, common, {
  devtool: 'cheap-module-eval-source-map',
  entry:   [
    'eventsource-polyfill', // necessary for hot reloading with IE
             'webpack-hot-middleware/client'
           ].concat(common.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

module.exports = devConfig;
