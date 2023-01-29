import JobStatusClient from '~/core/JobStatusClient';
import JobStatus from '~/vue2/JobStatus';

type VueOptions = import('~/types/vue').VueOptions;

/**
 * Install the vue plugin into Vue.
 */
export const installer = {
    install(VueInstance: any, options: VueOptions) {
        VueInstance.component('JobStatus', JobStatus);

        JobStatusClient.createInstance(options.url, options.axios);
    },
};

export default installer;
