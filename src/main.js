// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router.js';


const app = createApp(App);

app.use(createPinia());  // 使用 Pinia
app.use(router);          // 使用 Vue Router

app.mount('#app');

