// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import VueResource from 'vue-resource';
import app from './App.vue';
import moment from 'moment';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.filter('dateFormat', function (data, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(data).format(pattern);
})

Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 按需引入 Mint-UI 组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// 导入 MUI  
import './lib/mui/dist/css/mui.min.css';

// 导入 MUI icon-extra
import './lib/mui/dist/css/icons-extra.css'; 



new Vue({
    el: '#app',
    render: c => c(app),
    router
})