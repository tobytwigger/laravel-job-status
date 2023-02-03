import { get, post } from 'src/utils/client/requestHandler';
import {
  Batch,
  DashboardResponse,
  JobFailureReason,
  JobRun,
  TrackedJob,
} from 'src/types/api';
import { generateUrl } from 'src/utils/client/urlGenerator';

const dashboard = (): Promise<DashboardResponse> => {
  return get(generateUrl('dashboard')).then((response) => {
    return {
      test: '',
    };
  });
};

const jobList = (): Promise<TrackedJob[]> => {
  return get(generateUrl('tracked-job')).then((response) => {
    return response.data as TrackedJob[];
  });
};

const jobShow = (alias: string): Promise<TrackedJob> => {
  return get(generateUrl('tracked-job/' + encodeURIComponent(alias))).then(
    (response) => {
      return response.data as TrackedJob;
    }
  );
};

const runShow = (jobStatusId: number): Promise<JobRun> => {
  return get(generateUrl('job-run/' + jobStatusId.toString())).then(
    (response) => {
      return response.data as JobRun;
    }
  );
};

const history = (): Promise<JobRun[]> => {
  return get(generateUrl('history')).then((response) => {
    return response.data as JobRun[];
  });
};

const signal = (
  jobStatusId: number,
  signal: string,
  cancel: boolean,
  parameters: { [key: string]: any }
): Promise<void> => {
  return post(generateUrl('signal/' + jobStatusId.toString()), {
    signal: signal,
    cancel_job: cancel ? '1' : '0',
    parameters: parameters,
  }).then((response): void => {
    return;
  });
};

const batchList = (): Promise<Batch[]> => {
  return get(generateUrl('batch')).then((response) => {
    return response.data as Batch[];
  });
};

const batchShow = (batchId: number): Promise<Batch> => {
  return get(generateUrl('batch/' + batchId.toString())).then((response) => {
    return response.data as Batch;
  });
};

const jobFailureReasons = (alias: string): Promise<JobFailureReason[]> => {
  return get(
    generateUrl('tracked-job/' + encodeURIComponent(alias) + '/failures')
  ).then((response) => {
    return response.data as JobFailureReason[];
  });
};

const retry = (jobStatusId: number): Promise<void> => {
  return post(generateUrl('job-run/' + jobStatusId.toString() + '/retry')).then(
    (response) => {
      return;
    }
  );
};

export default {
  dashboard,
  jobList,
  jobShow,
  runShow,
  history,
  signal,
  batchList,
  batchShow,
  jobFailureReasons,
  retry,
};
