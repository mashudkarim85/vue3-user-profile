import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app')
