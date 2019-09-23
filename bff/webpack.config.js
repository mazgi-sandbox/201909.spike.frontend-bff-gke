const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{loader: 'ts-loader'}],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['js', 'ts'],
  }
}
