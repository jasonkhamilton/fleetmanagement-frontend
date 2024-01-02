// router.js
import { createRouter, createWebHistory } from 'vue-router';
// Import your components
import AssetSummary from './components/AssetSummary.vue';
import AssetDetail from './components/AssetDetail.vue';
import HomePage from './components/HomePage.vue';
import ServicingSummary from './components/ServicingSummary.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/assets',
    name: 'AssetSummary',
    component: AssetSummary
  },
  {
    path: '/asset/:id',
    name: 'AssetDetail',
    component: AssetDetail,
    props: true
  },
  {
    path: '/servicing',
    name: 'Servicing',
    component: ServicingSummary,
    props: true
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
