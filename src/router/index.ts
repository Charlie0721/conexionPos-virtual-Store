import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Main from '../components/main.vue';

const routes: Array<RouteRecordRaw> = [

    {
        path: '/',
        name: 'main',
        component: Main
    },


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router