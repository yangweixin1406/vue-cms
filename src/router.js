import VueRouter from 'vue-router';
import app from './App.vue';

const router = new VueRouter({
    routes: [
        { path: '/', component: app }
    ]
})

export default router;