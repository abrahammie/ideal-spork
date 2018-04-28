const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './client/src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    rules: [
     {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'client/src'),
      ],
      loader: 'babel-loader',
      options: {
        presets: ['react', 'env'],
      },
     },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  mode: 'none',
};
