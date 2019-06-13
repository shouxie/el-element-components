const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const Components = require('../components.json');

let externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`el-element-components/packages/${key}`] = `el-element-components/lib/${key}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'dlj-table': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
