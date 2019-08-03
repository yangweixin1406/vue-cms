// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import VueResource from 'vue-resource';
import app from './App.vue';
import moment from 'moment';
import VuePreview from 'vue-preview';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview);

Vue.filter('dateFormat', function (data, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(data).format(pattern);
})

// 设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//设置post传输格式
Vue.http.options.emulateJSON = true;

//按需引入 Mint-UI 组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全加载
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 导入 MUI  
import './lib/mui/dist/css/mui.min.css';

// 导入 MUI icon-extra
import './lib/mui/dist/css/icons-extra.css';

new Vue({
    el: '#app',
    render: c => c(app),
    router
})