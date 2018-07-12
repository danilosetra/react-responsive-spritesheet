const path = require('path');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'es2017', 'stage-3', 'react'],
            plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-react-jsx']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
          safari10: true
        }
      })
    ]
  },
  externals: {
    react: 'commonjs react'
  }
};
