<template>
    <dl class='dlj-sub-title'>
        <dt class='mainTitle'>
            <div class='icon'></div>
            <h4><slot></slot></h4>
            <ul v-if='btns && btns.length'>
                <li v-for="i in btns" :key="i.name">
                    <el-button @click="i.call" type="text">{{i.name}}</el-button>
                </li>
            </ul>
        </dt>
        <dd v-if='subTitle' class='subTitle'>{{subTitle}}</dd>
    </dl>
</template>
<script>
export default {
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
