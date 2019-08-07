// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import VueResource from 'vue-resource';
import app from './App.vue';
import moment from 'moment';
import VuePreview from 'vue-preview';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview);
Vue.use(Vuex);

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

//从localStorgae 中获取数据
let car = JSON.parse(localStorage.getItem('car') || '[]');

const store =new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar (state, goodsinfo) {
            let flag = false;

            state.car.some( item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            } )

            if (!flag) {
                state.car.push(goodsinfo);
            }

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateShopCar (state, goodsinfo) {
            state.car.some( item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
                
            } )

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFromCar (state, id) {
            state.car.some( (item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            } )

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateSelectedWhenChanged (state, info) {
            state.car.some( item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                    return true;
                }
            } )

            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount (state) {
            let c = 0;

            state.car.forEach( item => {
                c += item.count;
            } )

            return c;
        },
        getGoodsCount (state) {
            const o = {};

            state.car.forEach( item => {
                o[item.id] = item.count;
            } )

            return o;
        },
        getGoodsSelected (state) {
            const o = {};

            state.car.forEach( item => {
                o[item.id] = item.selected;
            } )

            return o;
        },
        getAllPrice (state) {
            const o = {
                count: 0,  //勾选的数量
                amount: 0   //勾选的总价
            }

            state.car.forEach( item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            } )

            return o;
        }
    }
})

new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})