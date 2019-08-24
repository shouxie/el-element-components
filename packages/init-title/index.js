import InitTitle from './src/main.vue';
InitTitle.install = function(Vue) {
	Vue.component(InitTitle.ComponentName, InitTitle);
}

export default InitTitle