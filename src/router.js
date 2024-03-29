// router.js
import { createRouter, createWebHistory } from 'vue-router';
// Import your components
import { AssetSummary, AssetDetail } from './components/Assets';
import HomePage from './components/HomePage.vue';
import { ServicingSummary } from './components/Services';
import { WorkOrderSummary, WorkOrderDetail } from './components/WorkOrders';

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
  {
    path: '/workorders',
    name: 'WorkOrders',
    component: WorkOrderSummary,
    props: true
  },
  {
    path: '/workorder/:id',
    name: 'WorkOrderDetail',
    component: WorkOrderDetail,
    props: true
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
