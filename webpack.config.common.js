const path = require('path');

module.exports = {
  entry:  [
    './client/src/main.js'
  ],
  output: {
    path:       path.join(__dirname, 'client/public/dist'),
    filename:   'bundle.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client/src')
      },
      {
        test:    /\.jsx?$/,
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

