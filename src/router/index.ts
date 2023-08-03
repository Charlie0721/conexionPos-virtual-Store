import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main.vue';
import Products from '../products/components/GetProductsByWarehouse.vue';
import CategoriesWarehouse from '.././categories/components/GetAllCategories.vue'
import ProductsByCategories from '.././categories/components/FilterProductsByCategories.vue'
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
  {
    path: '/categories',
    name: 'categories-by-idalmacen',
    component: CategoriesWarehouse,
  },
  {
    path: '/categories/:idalmacen/:nombre',
    name: 'products-by-categories',
    component: ProductsByCategories,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
