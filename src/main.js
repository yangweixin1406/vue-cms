// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js'

// 按需引入 header 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//导入 MUI 
import './lib/mui/dist/css/mui.min.css';

Vue.use(VueRouter);

new Vue({
    router
}).$mount('#app');