/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:40:26
 * @LastEditTime: 2019-08-23 15:21:44
 * @LastEditors: Please set LastEditors
 */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'DLJCOMPONENTS',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: config.alias
  },
  externals: {
    vue: config.vue
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
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
