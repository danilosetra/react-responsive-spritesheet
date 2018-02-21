var path = require('path');
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new MinifyPlugin({},{comments:false})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { "modules": false }], 'stage-3', 'react']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};