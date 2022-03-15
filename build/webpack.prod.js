const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common.js");
const PATHS = require("./paths");

module.exports = merge(common, {
  mode: "production",
  bail: true,
  output: {
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // parse: {
          //   ecma: 8,
          // },
          compress: {
            // ecma: 5,
            warnings: false,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            // ecma: 5,
            comments: false,
            // Emoji and regex is not minified properly using default
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
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
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      ignoreOrder: true,
    }),
  ],
});
