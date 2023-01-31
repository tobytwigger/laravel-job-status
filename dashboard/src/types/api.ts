export interface TrackedJob {
  class: string;
  alias: string;
  runs: JobRun[];
  count: number;
}

export interface JobRun {
  alias: string;
  class: string;
  percentage: number;
  status: string;
  uuid: string;
  parent: JobRun|null,
  created_at: Date,
  messages: JobMessage[],
  signals: JobSignal[],
  exception: JobException|null
  statuses: JobStatusStatus[]
  started_at: Date|null,
  finished_at: Date|null,
  batch_id: number,
  batch_id_uuid: string,
  id: number,
  tags: {
    [key: string]: string;
  }
}

export interface JobStatusStatus {
  id: number,
  status: Status
  created_at: Date,
}

export interface Batch {
  id: number,
  count: number,
  runs: JobRun[],
  batch_id: string,
  name: string|null,
  created_at: Date,
  queued: number,
  started: number,
  failed: number,
  succeeded: number,
  cancelled: number
}

export interface JobMessage {
  id: number,
  message: string
  created_at: Date
  type: MessageType,
}

export interface JobException {
  id: number
  created_at: Date
  updated_at: Date
  previous: JobException|null
  message: string
  job_status_id: number
  line: number
  file: string
  code: number
  stack_trace: StackTraceLine[]
}

export interface StackTraceLine {
  file: string
  line: number
  function: string
  class: string
  type: string
}

export interface JobSignal {
  id: number,
  signal: string,
  created_at: Date,
  handled_at: Date,
  cancel_job: boolean,
  parameters: {
    [key: string]: string
  }
}

export interface DashboardResponse {
  test: string;
}

export enum Status {
  Queued = 'queued',
  Started = 'started',
  Cancelled = 'cancelled',
  Failed = 'failed',
  Succeeded = 'succeeded',
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Debug = 'debug',
}

// export interface FullTrackedJob extends TrackedJob{
//
// }
