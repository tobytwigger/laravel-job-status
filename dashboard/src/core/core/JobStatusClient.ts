import ApiUrlGenerator from '~/utils/ApiUrlGenerator';
import {AssociativeObject, JobStatus} from '~/types/core';
import {Axios, AxiosError, AxiosResponse} from 'axios';

/** Handles interacting with a job status */
class JobStatusClient {

    /**
     * The singleton instance
     *
     * @private
     */
    private static instance: JobStatusClient | null = null;

    /**
     * A url generator
     */
    readonly _url: ApiUrlGenerator;

    /**
     * Axios, the client
     */
    readonly axios: Axios;

    /**
     * Get the url to make the request to as a string
     */
    get url(): string {
        return this._url.url;
    }

    /**
     * Create a new instance of the job status client to use as a singleton
     *
     * @param url The base url to make requests to
     * @param axios An axios instance to use to make requests
     */
    public static createInstance(url: string, axios: Axios) {
        JobStatusClient.instance = new JobStatusClient(url, axios);
    }

    /**
     * Get the singleton instance if it's been created
     */
    public static getInstance(): JobStatusClient {
        if (JobStatusClient.instance === null) {
            throw new Error('Please call createInstance before getting an instance of the job status client');
        }

        return JobStatusClient.instance;
    }

    private constructor(url: string, axios: Axios) {
        this._url = new ApiUrlGenerator(url);
        this.axios = axios;
    }

    /**
     * Send a signal to a job status
     *
     * @param jobStatusId The ID of the job status
     * @param signal The signal name
     * @param cancelJob Whether to cancel the signal
     * @param parameters The parameters to pass into the signal
     */
    sendSignal(
        jobStatusId: number,
        signal: string,
        cancelJob: boolean,
        parameters: AssociativeObject = {},
    ): Promise<null> {
        return new Promise<null>((resolve, reject) => {
            const data = {
                signal,
                parameters,
                cancel_job: cancelJob,
            };

            this.axios
                .post(this._url.sendSignal(jobStatusId), data)
                .then(() => resolve(null))
                .catch((error) => reject(error));
        });
    }

    /**
     * Find a single job status
     *
     * @param jobAlias The alias of the job to find
     * @param tags The tags of the job to find
     */
    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null> {
        return new Promise<JobStatus | null>((resolve, reject) => {
            this.axios
                .get(this._url.searchForJobStatus(jobAlias, tags))
                .then((response: AxiosResponse) => {
                    resolve(response.data);
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status === 404) {
                        resolve(null);
                    }
                    reject(error);
                });
        });
    }

    /**
     * Clear the currently created instance
     */
    static clearInstance() {
        JobStatusClient.instance = null;
    }
}

export default JobStatusClient;
