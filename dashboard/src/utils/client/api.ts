import {get} from 'src/utils/client/requestHandler';
import {dashboardResponse, results} from 'src/types/api';
import {dashboard as dashboardUrl, jobList as jobListUrl} from 'src/utils/client/urlGenerator';

const dashboard = (): Promise<dashboardResponse> => {
  return get(dashboardUrl)
    .then(response => {
      return {
        test: ''
      }
    });
}

const jobList = (): Promise<results> => {
  return get(jobListUrl)
    .then(response => {
      return response.data as results;
    });
}

export default {dashboard, jobList};
