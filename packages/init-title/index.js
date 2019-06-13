import InitTitle from './src/main.vue';
InitTitle.install = function(Vue) {
	Vue.component(InitTitle.name, InitTitle);
}

export default InitTitle