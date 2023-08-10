import { createApp } from 'vue';
import {useloginUserStore} from './users/stores/login.store'
import  {createPinia} from 'pinia'
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
const pinia = createPinia()
 const app = createApp(App);
app.use(pinia)
app.use(router);
app.mount('#app');
export const loginUserStore=useloginUserStore()

