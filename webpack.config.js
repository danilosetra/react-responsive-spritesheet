const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /(node_modules|bower_components|build)/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        }
      })
    ]
  },
  externals: {
    react: 'commonjs react'
  }
};
