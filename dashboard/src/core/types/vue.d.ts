import {Axios} from 'axios';
import Vue from 'vue';

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

interface VueOptions {
    url: string;
    axios: Axios;
}

export {VueOptions};
