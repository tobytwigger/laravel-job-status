import JobStatusNotifier from '~/core/JobStatusNotifier';
import {AssociativeObject} from '~/types/core';
import QueryHasher from '~/utils/QueryHasher';

interface NotifierObject {
    [key: string]: JobStatusNotifier;
}

class NotifierCollection {
    notifiers: NotifierObject = {};

    get(jobAlias: string, tags: AssociativeObject): JobStatusNotifier | null {
        const key: string = this._getKey(jobAlias, tags);
        if (Object.keys(this.notifiers).indexOf(key) > -1) {
            return this.notifiers[key];
        }
        return null;
    }

    push(jobStatusNotifier: JobStatusNotifier): void {
        const key: string = this._getKey(jobStatusNotifier.jobAlias, jobStatusNotifier.tags);
        this.notifiers[key] = jobStatusNotifier;
    }

    private _getKey(jobAlias: string, tags: AssociativeObject): string {
        return QueryHasher.encode(jobAlias, tags);
    }
}

export default NotifierCollection;
