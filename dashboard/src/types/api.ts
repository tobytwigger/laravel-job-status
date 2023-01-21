export interface results {
  jobs: trackedJob[];
}

export interface trackedJob {
  class: string;
  alias: string;
  tags: {
    [key: string]: string;
  },
  runs: jobRun[]
}

export interface jobRun {
  alias: string;
  class: string;
  percentage: number;
  status: string;
  uuid: string;
  parent: jobRun
}

export interface dashboardResponse {
  test: string;
}
