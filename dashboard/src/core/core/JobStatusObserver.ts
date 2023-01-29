import {AssociativeObject} from '~/types/core';
import JobStatusNotifierPool from '~/core/JobStatusNotifierPool';
import JobStatusNotifier from '~/core/JobStatusNotifier';
import JobStatusClient from '~/core/JobStatusClient';
import {Axios} from 'axios';

class JobStatusObserver {
    interval: NodeJS.Timer | null = null;

    private readonly jobAlias: string;

    private readonly tags: AssociativeObject;

    constructor(jobAlias: string, tags: AssociativeObject) {
        this.jobAlias = jobAlias;
        this.tags = tags;
    }

    poll(ms: number = 5000): JobStatusNotifier {
        this.interval = setInterval(async () => await this.update(), ms);
        return JobStatusNotifierPool.getInstance().get(this.jobAlias, this.tags);
    }

    static setupClient(url: string, a: Axios) {
        JobStatusClient.createInstance(url, a);
    }

    update(): Promise<void> {
        JobStatusNotifierPool.getInstance().get(this.jobAlias, this.tags).triggerLoading();
        return JobStatusClient.getInstance()
            .get(this.jobAlias, this.tags)
            .then((jobStatus) =>
                JobStatusNotifierPool.getInstance().get(this.jobAlias, this.tags).triggerUpdate(jobStatus),
            )
            .catch((error) => JobStatusNotifierPool.getInstance().get(this.jobAlias, this.tags).triggerError(error))
            .finally(() => JobStatusNotifierPool.getInstance().get(this.jobAlias, this.tags).triggerFinishedLoading());
    }

    cleanup() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;
    }
}

export default JobStatusObserver;
