const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = require('./paths');

// Set Environment
const NODE_ENV = process.env.NODE_ENV || 'development';

const isEnvDevelopment = NODE_ENV === 'development';
const isEnvProduction = NODE_ENV === 'production';

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-normalize',
          ],
        },
        sourceMap: isEnvDevelopment,
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    });
  }

  return loaders;
};

module.exports = {
  devtool: false,
  entry: {
    app: `${PATHS.SRC_DIR}/index.js`,
  },
  output: {
    path: PATHS.BUILD_DIR,
    publicPath: '/',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    clean: true,
  },
  cache: {
    type: 'filesystem',
    store: 'pack',
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
        options: {
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
              },
            ],
            isEnvDevelopment && 'react-refresh/babel',
          ].filter(Boolean),
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
            '@babel/preset-react',
          ],
        },
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
        use: [],
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isEnvDevelopment,
          modules: {
            mode: 'icss',
          },
        }),
        sideEffects: true,
      },
      {
        test: /\.(scss|sass)$/,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isEnvDevelopment,
            modules: {
              mode: 'icss',
            },
          },
          'sass-loader',
        ),
        sideEffects: true,
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.PUBLIC_DIR}`,
          to: PATHS.DIST_DIR,
          filter: async (resourcePath) => {
            if (resourcePath.includes('index.html')) {
              return false;
            }
            return true;
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new InterpolateHtmlPlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
};
