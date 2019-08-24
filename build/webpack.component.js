/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:40:12
 * @LastEditTime: 2019-08-24 15:11:18
 * @LastEditors: Please set LastEditors
 */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const Components = require('../components.json');
const config = require('./config');

const webpackConfig = {
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: 'none',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
          test: /\.less$/,
          exclude : '/node_modules',
          use: [
              {
                  loader: 'style-loader'
              },
              {
                  loader: 'css-loader',   
                  options: {
                      importLoaders: 1
                  }
              },
              {
                  loader: 'postcss-loader',
                  options: {
                      ident: 'postcss',
                      plugins: (loader) => [
                        require('postcss-import')({ root: loader.resourcePath }),
                        require('postcss-cssnext')(),
                        require('autoprefixer')(),
                        require('cssnano')()
                      ]
                    }
              },
              {
                  loader: 'less-loader',  // 
                  options: {
                      importLoaders: 1
                  }
              }
          ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};

module.exports = webpackConfig;
