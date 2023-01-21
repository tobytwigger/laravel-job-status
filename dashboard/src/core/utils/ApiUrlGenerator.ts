import {AssociativeObject} from '~/types/core';

class ApiUrlGenerator {
    url: string;
    constructor(baseUrl: string) {
        this.url = baseUrl;
    }

    withPrefix(prefix: string): string {
        return this.url + (this.url.endsWith('/') ? '' : '/') + prefix;
    }

    searchForJobStatus(jobAlias: string, tags: AssociativeObject): string {
        const urlParams = new URLSearchParams();
        urlParams.set('alias', jobAlias);
        Object.keys(tags).forEach((key) => urlParams.set('tags[' + key + ']', tags[key]));

        return this.withPrefix('job-status?' + urlParams.toString());
    }

    sendSignal(jobStatusId: number): string {
        return this.withPrefix('job-status/' + jobStatusId + '/job-signal');
    }
}

export default ApiUrlGenerator;
