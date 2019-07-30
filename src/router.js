import VueRouter from 'vue-router';
import app from './App.vue';
import home from './components/tabbar/HomeContainer.vue';
import member from './components/tabbar/MemberContainer.vue';
import shopcar from './components/tabbar/ShopCarContainer.vue';
import search from './components/tabbar/SearchContainer.vue';

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/', 
          component: app,
          children: [
              { path: 'home', component: home },
              { path: 'member', component: member },
              { path: 'shopcar', component: shopcar },
              { path: 'search', component: search }
          ]
        }
    ],
    linkActiveClass: 'mui-active'
})

export default router;