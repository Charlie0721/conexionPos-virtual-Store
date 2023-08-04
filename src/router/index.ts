import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main.vue';
import Products from '../products/components/GetProductsByWarehouse.vue';
import CategoriesWarehouse from '.././categories/components/GetAllCategories.vue'
import ProductsByCategories from '.././categories/components/FilterProductsByCategories.vue'
import CxposUser from '../conexion-pos-user/component/ConexionPosUser.vue'
import Signup from '../users/components/Signup.vue'
import Login from '../users/components/Login.vue'
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
  {
    path: '/conexion-pos-user',
    name: 'conexion-pos-user',
    component: CxposUser,
  },
  {
    path: '/signup/conexion-pos-user',
    name: 'conexion-pos-user-signup',
    component: Signup,
  },
  {
    path: '/login/conexion-pos-user',
    name: 'conexion-pos-user-login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
