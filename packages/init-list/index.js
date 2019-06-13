import InitList from './src/main.vue';

InitList.install = function(Vue) {
	Vue.component(InitList.name, InitList);
}

export default InitList