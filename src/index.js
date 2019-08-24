/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-05 18:10:04
 * @LastEditTime: 2019-08-24 15:15:05
 * @LastEditors: Please set LastEditors
 */
import InitTitle from '../packages/init-title/index.js';
// import InitList from '../packages/init-list/index.js';
import pkg from '../package.json';
// const pkg = require('../package.json');

// const components = [InitTitle, InitList];
const components = [InitTitle];
const install = (Vue, opts = {}) => {
  components.map(component => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: pkg.version,
  install,
  InitTitle
  // InitList
}