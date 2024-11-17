import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import CountryPage from './views/CountryPage.vue'; // 导入国家详情页

const routes = [
  { path: '/', component: HomePage },  // 首页路由
  { path: '/country/:id', component: CountryPage, props: true }, // 国家详情页，带参数
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



