import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main.vue';
import Products from '../products/components/GetProductsByWarehouse.vue'; 

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/products/:idalmacen',
    name: 'products-by-idalmacen',
    component: Products,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
