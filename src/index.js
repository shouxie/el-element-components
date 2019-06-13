import InitTitle from '../packages/init-title/index.js';
import InitList from '../packages/init-list/index.js';
import pkg from '../package.json';

const components = [InitTitle, InitList];

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
  InitTitle,
  InitList
}