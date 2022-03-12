const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require('./webpack.common.js');
const PATHS = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: PATHS.BUILD_DIR,
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${PATHS.DIST_DIR}/index.html`,
      template: `${PATHS.PUBLIC_DIR}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      },
    }),
  ],
});
