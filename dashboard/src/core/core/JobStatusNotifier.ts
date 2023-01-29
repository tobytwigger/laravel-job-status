import {AssociativeObject, JobStatus} from '~/types/core';

class JobStatusNotifier {
    jobAlias: string;

    tags: AssociativeObject;

    updateCallbacks: ((jobStatus: JobStatus | null) => void)[] = [];

    loadingCallbacks: (() => void)[] = [];

    finishLoadingCallbacks: (() => void)[] = [];

    errorCallbacks: ((error: Error) => void)[] = [];

    constructor(jobAlias: string, tags: AssociativeObject) {
        this.jobAlias = jobAlias;
        this.tags = tags;
    }

    onUpdated(callback: (jobStatus: JobStatus | null) => void): this {
        this.updateCallbacks.push(callback);
        return this;
    }

    onLoading(callback: () => void): this {
        this.loadingCallbacks.push(callback);
        return this;
    }

    onFinishedLoading(callback: () => void): this {
        this.finishLoadingCallbacks.push(callback);
        return this;
    }

    onError(callback: (error: Error) => void): this {
        this.errorCallbacks.push(callback);
        return this;
    }

    triggerUpdate(jobStatus: JobStatus | null) {
        this.updateCallbacks.forEach((callback: (jobStatus: JobStatus | null) => void) => callback(jobStatus));
    }

    triggerLoading() {
        this.loadingCallbacks.forEach((callback: () => void) => callback());
    }

    triggerFinishedLoading() {
        this.finishLoadingCallbacks.forEach((callback: () => void) => callback());
    }

    triggerError(error: Error) {
        this.errorCallbacks.forEach((callback: (error: Error) => void) => callback(error));
    }
}

export default JobStatusNotifier;
