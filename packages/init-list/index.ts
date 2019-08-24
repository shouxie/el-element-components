/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 20:14:32
 * @LastEditTime: 2019-08-23 15:15:33
 * @LastEditors: Please set LastEditors
 */
import InitList from './src/main.vue';

(InitList as any).install = function(Vue) {
	Vue.component(InitList.name, InitList);
}

export default InitList