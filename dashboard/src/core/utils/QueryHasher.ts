import {AssociativeObject} from '~/types/core';

/** Handles turning a job alias and tags into a unique string */
class QueryHasher {
    /**
     * Turn a job alias and tags into a string.
     *
     * This string is unique to the job alias and tag combination. It should also be reversible if needed.
     *
     * @param {string} jobAlias The alias of the job.
     * @param {AssociativeObject} tags The tags identifying the job.
     */
    static encode(jobAlias: string, tags: AssociativeObject): string {
        return encodeURIComponent(JSON.stringify({jobAlias, tags}));
    }

    /**
     * Check if the given string is the hash for the given job alias and tags
     *
     * @param {string} encoded The encoded string
     * @param {string} jobAlias The job alias to compare
     * @param tags The tags to compare
     *
     * @return {boolean} True if the encoded string matches the job alias and tags.
     */
    static check(encoded: string, jobAlias: string, tags: AssociativeObject): boolean {
        return encoded === this.encode(jobAlias, tags);
    }
}

export default QueryHasher;
