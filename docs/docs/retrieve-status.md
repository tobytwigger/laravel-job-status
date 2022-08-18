# Job Status
> How to retrieve information about the status of running jobs.

Although our frontend package takes care of this for you, you can make use of the job tracking in your backend too.

## Retrieving a status model

The status model is an eloquent model which represents a job. There is one per job, and it holds info about the messages sent, the job status, runtime etc.

### Status model scopes

You can retrieve the `JobStatus` model as you would a normal Eloquent model, but we've added a few extra scopes and methods to make it easier for you.

- `forJob(Job::class)`: Limit the job statuses to those of the given job type
- `forJobAlias('job-alias')`: Limit the job statuses to those of the given job alias. This is useful for referencing jobs in your frontend.
- `whereTag('election', '=', $electionId)`: Limit the job statuses to those with the given tag. The value of the tag must match.
- `whereStatus(JobStatus::SUCCESS) or whereSuccess()`: Limit the job statuses to those of status success. Similar for all statuses
- `whereNotStatus(JobStatus::SUCCESS) or whereNotSuccess()`: Limit the job statuses to those without the given status. Can also pass in an array.

## Using the status model

A job has one of the following statuses
- queued
- started
- succeeded
- cancelled
- failed

Methods on the single status model:
- `getStatus()`: Get the status of the job.
- `getPercentge()`: Get the status of the job.
- `isSuccessful()`: True if the job was a success
- `isRunning()`: True if the job was a success
- `isQueued()`: True if the job was a success
- `hasFinished()`: True if the job is no longer running.

There are more functions covered later, to do with [signals](./signals.md) and [messages](./messages.md).

## Collections

If you retrieve a collection of status models, we provide some extra useful functions for interacting with them.

- `countFinished()`: Count how many jobs have finished.
- `countSuccessful()`: Count how many jobs were successful.
- `countRunning()`: Count how many jobs are still running.
- `countNotFinished()`: Count how many jobs are queued or running.


