const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const detect = require('detect-port');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

const PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || '0.0.0.0';

module.exports = async () => {
  const port = await detect(PORT);

  return merge(common, {
    mode: 'development',
    output: {
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    devServer: {
      port: port,
      host: HOST,
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
        progress: true,
      },
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({}),
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: `${PATHS.DIST_DIR}/index.html`,
        template: `${PATHS.PUBLIC_DIR}/index.html`,
      }),
      new MiniCssExtractPlugin({
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        ignoreOrder: true,
      }),
    ],
  });
};
