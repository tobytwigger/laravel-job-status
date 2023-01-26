export interface Results {
  jobs: TrackedJob[];
}

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
  statuses: JobStatusStatus[]
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

export interface JobMessage {
  id: number,
  message: string
  created_at: Date
  type: MessageType,
  stack_traces: StackTrace[]
}

export interface StackTrace {
  id: number
  job_message_id: number
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
