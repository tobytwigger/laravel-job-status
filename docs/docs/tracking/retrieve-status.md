# Job Status
> How to retrieve information about the status of running jobs.

## Retrieving a status model

The status model is an eloquent model which represents a job. There is one per job, and it holds info about the messages sent, the job status, runtime etc.

!!! note "Code info"
    This is done with a custom query class that builds up conditions. These are passed to the JobStatus repository where function

To retrieve a model, start with `JobStatus::`. This is just like Eloquent, so you can chain on as many of the following calls as you'd like.

- `forJob(Job::class)`: Limit the job statuses to those of the given job type
- `forJobAlias('job-alias')`: Limit the job statuses to those of the given job alias. This is useful for referencing jobs in your frontend.
- `whereTag('election', '=', $electionId)`: Limit the job statuses to those with the given tag. The value of the tag must match.
- `whereStatus(JobStatus::SUCCESS) or whereSuccess()`: Limit the job statuses to those of status success. Similar for all statuses
- `whereNotStatus(JobStatus::SUCCESS) or whereNotSuccess()`: Limit the job statuses to those without the given status. Can also pass in an array.


Once you've built up your query, call one of the following to get the results
- `first()`: Get the most recently dispatched job status matching the query or return null if no matching jobs.
- `firstOrFail()`: Get the most recently dispatched job status matching the query, or throw an exception.
- `all() or get()`: Get all matching job statuses
- `count()`: Get the number of matching jobs

If you use `all` or `get` you will get a JobStatusCollection instance. You can use this as a normal collection, but it also has additional useful methods
- `countFinished()`: Count how many jobs have finished
- `countSuccessful()`: Count how many jobs were sucessful`
- `countRunning()`: Count how many jobs are still running
- `countNotFinished()`: Count how many jobs are queued or running.

## Examples

- Get information about all jobs
  - `JobStatus::all()->countNotFinished()`: Get the total number of jobs not yet finished.
  - `JobStatus::first()`: Get the most recently dispatched job.

## Using the status model

A job has one of the following statuses
- queued
- started
- succeeded
- cancelled
- failed

Methods on the single status model:
- `getStatus()`: Get the status of the job.
- `wasSuccessful()`: True if the job was a success
- `hasFinished()`: True if the job is no longer running.
