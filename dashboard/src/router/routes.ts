import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
    ],
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoryPage.vue') }],
  },
  {
    path: '/jobs',
    name: 'jobs.index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/JobListPage.vue') }],
  },
  {
    path: '/jobs/:alias',
    name: 'jobs.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/JobShowPage.vue'),
      },
    ],
  },
  {
    path: '/run/:jobStatusId',
    name: 'run.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/RunShowPage.vue'),
      },
    ],
  },

  {
    path: '/batch',
    name: 'batch.index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BatchListPage.vue') },
    ],
  },
  {
    path: '/batch/:batchId',
    name: 'batch.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/BatchShowPage.vue'),
      },
    ],
  },

  {
    path: '/queues',
    name: 'queues.index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/QueueListPage.vue') },
    ],
  },
  {
    path: '/queues/:queue',
    name: 'queues.show',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/QueueShowPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
