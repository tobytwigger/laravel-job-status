import * as Vue from 'vue';
import axios from 'axios';
import Routes from './routes';
import * as VueRouter from 'vue-router';

let token = document.head.querySelector('meta[name="csrf-token"]');

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(window.JobStatus.path),
    routes: Routes,
})

const app = Vue.createApp({
        setup () {
            return {}
        }
    })
    .use(router)
    .mount('#job-status');
