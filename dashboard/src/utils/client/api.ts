import {get} from 'src/utils/client/requestHandler';
import {DashboardResponse, JobRun, Results, TrackedJob} from 'src/types/api';
import {
  dashboard as dashboardUrl,
  jobList as jobListUrl,
  jobShow as jobShowUrl,
  runShow as runShowUrl,
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

const runShow = (jobStatusId: string): Promise<JobRun> => {
  return get(runShowUrl(jobStatusId))
    .then(response => {
      return response.data as JobRun
    })
}

export default {dashboard, jobList, jobShow, runShow};
