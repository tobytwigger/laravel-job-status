export default [
    { path: '/', redirect: '/dashboard' },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: require('./screens/Dashboard').default,
    },

    // {
    //     path: 'failed',
    //     name: 'monitoring-failed',
    //     component: require('./screens/monitoring/tag-jobs').default,
    //     props: { type: 'failed' },
    // },

    // {
    //     path: '/metrics/',
    //     component: require('./screens/metrics/index').default,
    //     children: [
    //         {
    //             path: 'jobs',
    //             name: 'metrics-jobs',
    //             component: require('./screens/metrics/jobs').default,
    //         },
    //         {
    //             path: 'queues',
    //             name: 'metrics-queues',
    //             component: require('./screens/metrics/queues').default,
    //         },
    //     ],
    // },

];
