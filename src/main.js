// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

// 按需引入 Mint-UI 组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入 MUI  
import './lib/mui/dist/css/mui.min.css';

// 导入 MUI icon-extra
import './lib/mui/dist/css/icons-extra.css'; 



new Vue({
    router
}).$mount('#app');