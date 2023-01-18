# Understanding a job history
> How to read and use information about past or ongoing job runs.


## Getting a result
This is the basic class returned by the searcher, which contains the result of your search.

`$result = \JobStatus\Search\JobStatusSearcher::query()->get()`

[Read more](./searching.md) about searching and filtering job history to refine your results.

## Using the result

- `$result->jobs()` - Get an array of jobs that were tracked.
- `$result->first()` - Get the first job.
- `$result->count()` - Get the number of jobs in the result.

## Tracked Jobs

This represents a specific job that is being tracked and that matched your search results.

### Getting runs
- `$trackedJob->runs()` - Get a list of times the job has run.
- `$trackedJob->latest()` - Get the latest job run.

### Summary
- `$trackedJob->numberOfRuns()` - Get how many runs there have been.

### Job information
- `$trackedJob->tags()` - Get the tags in this job.
- `$trackedJob->jobClass()` - Get the class of the actual job.
- `$trackedJob->jobAlias()` - Get the alias of the job.

## Job Run

This represents a run of a job. It will contain things like the status, any messages the job sent and any signals that were received.

### Job Status

This is information around the run and if it was successful or not.

### Status

A job has one of the following statuses (in the enum `\App\Enums\Status`).
- queued
- started
- succeeded
- cancelled
- failed

- `$run->getStatus()`: Get the status of the job.
- `$run->getPercentge()`: Get the status of the job.
- `$run->isSuccessful()`: True if the job was a success
- `$run->isRunning()`: True if the job was a success
- `$run->isQueued()`: True if the job was a success
- `$run->hasBeenCancelled()`: True if the job was a success
- `$run->hasFailed()`: True if the job was a success
- `$run->hasFinished()`: True if the job is no longer running.

### Messages

- `$run->messages()` - Get an array of messages that were sent.
- `$run->mostRecentMessage(includeDebug: true)` - Get the most recent message that was sent.
- `$run->messagesOfType('error')` - Get all messages of the given type.

### Signals

- `$run->signals()` - Get an array of signals that were sent.

### Retries

If the run was retried, you can access its parent. This is the run that failed and caused the job to be retried.

- `$jobRun->hasParent()` - Check if the job has a parent.
- `$jobRun->isARetry()` - Check if the job is a retry of a failed job.
- `$jobRun->hasBeenRetried()` - Check if the job was retried.
- `$jobRun->parent()` - Get the parent of this job.
