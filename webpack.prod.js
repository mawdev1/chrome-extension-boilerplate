const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
})