import {AssociativeObject} from '~/types/core';
import JobStatusNotifier from '~/core/JobStatusNotifier';
import NotifierCollection from '~/core/NotifierCollection';

class JobStatusNotifierPool {
    private static instance: JobStatusNotifierPool;

    private pool: NotifierCollection;

    public static getInstance(): JobStatusNotifierPool {
        if (!JobStatusNotifierPool.instance) {
            JobStatusNotifierPool.instance = new JobStatusNotifierPool();
        }

        return JobStatusNotifierPool.instance;
    }

    private constructor() {
        this.pool = new NotifierCollection();
    }

    get(jobAlias: string, tags: AssociativeObject): JobStatusNotifier {
        let jobStatusNotifier: JobStatusNotifier | null = this.pool.get(jobAlias, tags);
        if (jobStatusNotifier === null) {
            jobStatusNotifier = new JobStatusNotifier(jobAlias, tags);
            this.pool.push(jobStatusNotifier);
        }
        return jobStatusNotifier;
    }
}

export default JobStatusNotifierPool;
