import {get, post} from 'src/utils/client/requestHandler';
import {Batch, DashboardResponse, JobRun, TrackedJob} from 'src/types/api';
import {
  dashboard as dashboardUrl,
  jobList as jobListUrl,
  jobShow as jobShowUrl,
  runShow as runShowUrl,
  history as historyUrl,
  signal as signalUrl,
  batchShow as batchShowUrl,
  batchList as batchListUrl
} from 'src/utils/client/urlGenerator';

const dashboard = (): Promise<DashboardResponse> => {
  return get(dashboardUrl)
    .then(response => {
      return {
        test: ''
      }
    });
}

const jobList = (): Promise<TrackedJob[]> => {
  return get(jobListUrl)
    .then(response => {
      return response.data as TrackedJob[];
    });
}

const jobShow = (alias: string): Promise<TrackedJob> => {
  return get(jobShowUrl(alias))
    .then(response => {
      return response.data as TrackedJob
    })
}

const runShow = (jobStatusId: number): Promise<JobRun> => {
  return get(runShowUrl(jobStatusId))
    .then(response => {
      return response.data as JobRun
    })
}

const history = (): Promise<JobRun[]> => {
  return get(historyUrl)
    .then(response => {
        return response.data as JobRun[]
    })
}

const signal = (jobStatusId: number, signal: string, cancel: boolean, parameters: {[key: string]: any}): Promise<void> => {
  return post(signalUrl(jobStatusId), {
    signal: signal,
    cancel_job: cancel ? '1' : '0',
    parameters: parameters
  })
    .then((response): void => {
      return;
    })
}

const batchList = (): Promise<Batch[]> => {
  return get(batchListUrl)
    .then(response => {
      return response.data as Batch[]
    })
}

const batchShow = (batchId: number): Promise<Batch> => {
  return get(batchShowUrl(batchId))
    .then(response => {
      return response.data as Batch
    })
}

export default {dashboard, jobList, jobShow, runShow, history, signal, batchList, batchShow};
