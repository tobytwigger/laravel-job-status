# Finding Jobs
> How to retrieve information about the status of running jobs.

Each job has a corresponding database entry containing the tracking information. 

You can display information about the status of a job, any messages that it's sent, and how many times it's previously ran by searching the database.

## Retrieving a status model

Use the `\JobStatus\Search\JobStatusSearcher` class to search for a status model.

```php
<?php

$results = \JobStatus\Search\JobStatusSearcher::query()
    ->whereJobAlias('process-podcast')
    ->whereTag('podcast', 5)
    ->get();
// or
$results = ProcessPodcast::search(['podcast' => 5])->get();
```

### Filtering results

There are additional queries you can chain onto the searcher to further filter results.

- `whereJobClass($jobClass)` - Filter by the job class (.e.g `\App\Jobs\ProcessPodcast`)
- `whereJobAlias($jobAlias)` - Filter by the job alias
- `whereTag($key, $value)` - Filter by a tag
- `whereTags(['key' => 'value'])` - Filter by multiple tags in a key-value array
- `whereFinished` - Filter to jobs that have finished running
- `whereNotFinished` - Filter to jobs that are running or queued
- `whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED])` - Filter to jobs with the given statuses
- `whereStatusIn([\JobStatus\Enums\Status::FAILED])` - Filter to jobs without the given statuses

### Understanding the results

#### Job types

Searches may contain different jobs if you do not limit them by class or alias or tags differ. The results are an instance of `\JobStatus\Search\Result`, which contains all the different jobs.

`$result = \JobStatus\Search\JobStatusSearcher::query()->get()`

When getting results you will generally either want to get a summary of the job, or see the history or status of a specific run.

To see all the different jobs in the query and summarise them, you can call `$result->jobs()`. This will give you an array of `TrackedJob` classes.

If you have specified enough filters to only return one job type, simply calling `$result->first()` will get you the first `TrackedJob`.

#### Tracked Jobs

The tracked job has information about the job and a list of all past runs.

These runs can be accessed with `$trackedJob->runs()`, or the lastest run with `$trackedJob->latest()`.

#### Job Run

A job run will give you access to the **status model** through `jobStatus()`, which then has more information about signals, messages, the job itself etc.

You can also access the parent job with `hasParent()` or `parent()`. This will either be false/null, or will return the job that started this job. This is the case when a job is retried - if the parent job failed, it dispatched the child and can be accessed with `parent()`.


## Using the status model

A job has one of the following statuses (in the enum `\App\Enums\Status`)
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
