let path = require('path');
let MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [new MinifyPlugin({}, { comments: false })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'stage-3', 'react']
          }
        }
      }
    ]
  },
  externals: {
    react: 'commonjs react'
  }
};
