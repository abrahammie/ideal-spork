const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
        path.resolve(__dirname, 'src'),
      ],
      exclude: [
        path.resolve(__dirname, 'dist'),
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
