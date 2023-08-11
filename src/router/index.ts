import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main.vue';
import Products from '../products/components/GetProductsByWarehouse.vue';
import CategoriesWarehouse from '.././categories/components/GetAllCategories.vue'
import ProductsByCategories from '.././categories/components/FilterProductsByCategories.vue'
import CxposUser from '../conexion-pos-user/component/ConexionPosUser.vue'
import Signup from '../users/components/Signup.vue'
import Login from '../users/components/Login.vue'
import allProducts from '../products/components/GetProductsAuthUser.vue';
import GetOneProduct from '../products/components/UpdateProduct.vue';
import  UploadPhoto from '../products/components/UploadPhotoFIle.vue';

import { useloginUserStore } from '../users/stores/login.store';

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
    path: '/products',
    name: 'all-products',
    component: allProducts,
    meta: { requiresAuth: true }
  },
  {
    path: '/product/get-product/:idproducto',
    name: 'one-product',
    component: GetOneProduct
  },
  {
    path: '/product/upload-photo-file/:idproducto',
    name: 'photo-file',
    component: UploadPhoto
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

router.beforeEach((to, from, next) => {
  console.log(from)
  const store = useloginUserStore();
  const isAuthenticated = store.checkAuthentication();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'conexion-pos-user-login' });
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router;