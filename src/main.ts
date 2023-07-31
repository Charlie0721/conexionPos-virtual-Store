import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'; 


const app = createApp(App)
app.use(createPinia())
createApp(App).mount('#app')
