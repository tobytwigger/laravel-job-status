import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {name: 'dashboard'}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component: () => import('pages/DashboardPage.vue')}],
  },
  {
    path: '/jobs',
    name: 'jobs.index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component:  () => import('pages/JobListPage.vue')}]
  },
  {
    path: '/jobs/:alias',
    name: 'jobs.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', props: true, component:  () => import('pages/JobShowPage.vue')}],
  },
  {
    path: '/run/:jobStatusId',
    name: 'run.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', props: true, component: () => import('pages/RunShowPage.vue')}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
