import VueRouter from 'vue-router';
import Home from './components/tabbar/HomeContainer.vue';
import Member from './components/tabbar/MemberContainer.vue';
import Shopcar from './components/tabbar/ShopCarContainer.vue';
import Search from './components/tabbar/SearchContainer.vue';
import NewsList from './components/home/NewsList.vue';
import NewsInfo from './components/home/NewsInfo.vue';
import PhotoList from './components/home/PhotoList.vue';
import PhotoInfo from './components/home/PhotoInfo.vue';
import GoodsList from './components/home/GoodsList.vue';
import GoodsInfo from './components/home/GoodsInfo.vue';

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo },
    ],
    linkActiveClass: 'mui-active'
})

export default router;