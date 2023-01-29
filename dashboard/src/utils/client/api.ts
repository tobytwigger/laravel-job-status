import {get, post} from 'src/utils/client/requestHandler';
import {DashboardResponse, JobRun, Results, TrackedJob} from 'src/types/api';
import {
  dashboard as dashboardUrl,
  jobList as jobListUrl,
  jobShow as jobShowUrl,
  runShow as runShowUrl,
  history as historyUrl,
  signal as signalUrl
} from 'src/utils/client/urlGenerator';

const dashboard = (): Promise<DashboardResponse> => {
  return get(dashboardUrl)
    .then(response => {
      return {
        test: ''
      }
    });
}

const jobList = (): Promise<Results> => {
  return get(jobListUrl)
    .then(response => {
      return response.data as Results;
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

export default {dashboard, jobList, jobShow, runShow, history, signal};
