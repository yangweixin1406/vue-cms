import VueRouter from 'vue-router';
import Home from './components/tabbar/HomeContainer.vue';
import Member from './components/tabbar/MemberContainer.vue';
import Shopcar from './components/tabbar/ShopCarContainer.vue';
import Search from './components/tabbar/SearchContainer.vue';
import NewsList from './components/home/NewsList.vue';
import NewsInfo from './components/home/NewsInfo.vue';

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo }
    ],
    linkActiveClass: 'mui-active'
})

export default router;