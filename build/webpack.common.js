const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = require('./paths');

// Set Environment
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: `${PATHS.SRC_DIR}/index.js`,
  },
  stats: {
    children: false,
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: PATHS.SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/fonts/[name].[hash:8].[ext]',
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/fonts/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: PATHS.SRC_DIR,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: PATHS.PUBLIC_DIR, to: PATHS.DIST_DIR }]),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
};
