<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 20:03:57
 * @LastEditTime: 2019-08-24 15:10:38
 * @LastEditors: Please set LastEditors
 -->
<template>
    <dl class='dlj-sub-title'>
        <dt class='dlj-sub-title_h1'>
            <div class='dlj-sub-title_icon'></div>
            <h4 class='dlj-sub-title_h4'><slot></slot></h4>
            <ul class='dlj-sub-title_button' v-if='btns && btns.length'>
                <li class='dlj-sub-title_button__item' v-for="i in btns" :key="i.name">
                    <el-button @click="i.call" type="text">{{i.name}}</el-button>
                </li>
            </ul>
        </dt>
        <dd v-if='subTitle' class='dlj-sub-title_explain'>{{subTitle}}</dd>
    </dl>
</template>
<script>
// import { Vue, Component, Prop } from "vue-property-decorator";
// @Component
export default {
    // @Prop() subTitle!: String;
    // @Prop() btns!: Object[];
    // static ComponentName = 'InitTitle'
    name: 'InitTitle',
    props: {
        subTitle: {
            type: String
        },
        btns: {
            type: Array
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../styles/init-title.less';
</style>
