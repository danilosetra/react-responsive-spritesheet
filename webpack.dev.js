const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'demo/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'demo-dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [path.resolve(__dirname, 'src/js'), path.resolve(__dirname, 'demo')],
        exclude: /(node_modules|bower_components|build)/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Spritesheet Dev</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    client: {
      overlay: true,
      logging: 'info'
    }
  }
};
