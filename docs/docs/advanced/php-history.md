# Interacting with job history in your code

Although you can make use of the API in this package, you may find yourself needing something more advanced and custom to your use case.

You can access the job history through your app with our intuitive search results.

## Searching for job history

Searching for job tracking is done using Eloquent. Query the `\JobStatus\Models\JobStatus` model - each of these models represents a job that has been queued or ran.

To make it easier, we've provided some scopes.

- `whereClass($jobClass)` - Filter by the job class (.e.g `\App\Jobs\ProcessPodcast`)
- `whereAlias($jobAlias)` - Filter by the job alias
- `whereTag($key, $value)` - Filter by a tag. Set the value to `true` for .
- `whereTags(['key' => 'value'])` - Filter by multiple tags in a key-value array
- `whereHasTag('key1')` - Filter to jobs that have a tag, with any or no value.
- `whereHasTags(['key1', 'key2'])` - Filter by multiple tags existing
- `whereFinished()` - Filter to jobs that have finished running
- `whereNotFinished()` - Filter to jobs that are running or queued
- `whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED])` - Filter to jobs with the given statuses
- `whereStatusNotIn([\JobStatus\Enums\Status::FAILED])` - Filter to jobs without the given statuses
- `whereUuid($uuid)` - Filter to jobs with a matching uuid
- `forUsers(1)` - Filter to jobs that allows the given use to access it. This will also match all public jobs.

!!! Index-less
    If you use index-less tags, omit the value in `whereTag` and pass the value into `whereHasTag`;
    ```php
        ->whereTag('long-running')
        ->whereHasTag('long-running')
    ```

## Drilling into results

Once you have a collection of `JobStatus` models, you can make use of some handy macros

### Jobs

Calling `jobs()` gets you an array of `\JobStatus\Search\Results\TrackedJob`.

This contains information about the job itself, including analytics about previous runs.

### Batches

Calling `batches()` gets you an array of `\JobStatus\Search\Results\Batch`.

This contains information about the batch the jobs ran in. It will discard any results not in a batch.

### Runs

Calling `runs()` converts the models into instances of a `\JobStatus\Search\Results\JobRun` class. This has handy tools to help you interact with the run, and groups retries together so that you only see the latest runs and any retries are stored in the latest run.


## Methods available

### Tracked Job

Represents a job class itself. Contains information about the job and about the previous times the job has ran.

- `jobClass()` - The class of the job
- `alias()` - The alias of the job
- `runs()` - Every run the job has made
- `latest()` - The latest run
- `numberOfRuns()` - The number of runs made

### Batch

- `batchId()` - The ID of the batch.
- `name()` - The name of the batch.
- `runs()` - The jobs that make up the batch.
- `countRunsWithStatus($status)` - Count how many runs are in the batch with the given status
- `latest()` - The latest run in the batch

### Job Run

Each job run is a new time a job has been dispatched

#### Job Information

- `getTagsAsArray()` - Get the tags belonging to a job in a [key => value] format.
- `getPercentge()`: Get the status of the job.
- `accessibleBy($userId)` - Check if the given user ID can access the job
- `trackingIsPublic()` - True if the tracking is marked as public

#### Status

A job has one of the following statuses (in the enum `\App\Enums\Status`).
- queued
- started
- succeeded
- cancelled
- failed

- `$run->getStatus()`: Get the status of the job.
- `$run->isSuccessful()`: True if the job was a success
- `$run->isRunning()`: True if the job was a success
- `$run->isQueued()`: True if the job was a success
- `$run->isCancelled()`: True if the job was a success
- `$run->isFailed()`: True if the job was a success
- `$run->isFinished()`: True if the job is no longer running.

#### Messages

- `$run->messages()` - Get an array of messages that were sent.
- `$run->mostRecentMessage(includeDebug: true)` - Get the most recent message that was sent.
- `$run->messagesOfType('error')` - Get all messages of the given type.

#### Signals

- `$run->signals()` - Get an array of signals that were sent.

#### Retries

If the run was retried, you can access its parent. This is the run that failed and caused the job to be retried.

- `$jobRun->hasParent()` - Check if the job has a parent.
- `$jobRun->isARetry()` - Check if the job is a retry of a failed job.
- `$jobRun->parent()` - Get the parent of this job.


#### Exception

If an exception was thrown, you can access it through `$jobRun->getException()`.
