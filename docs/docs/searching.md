# Searching for a job history
> How to retrieve information about the status of jobs.

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
- `whereFinished()` - Filter to jobs that have finished running
- `whereNotFinished()` - Filter to jobs that are running or queued
- `whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED])` - Filter to jobs with the given statuses
- `whereStatusIn([\JobStatus\Enums\Status::FAILED])` - Filter to jobs without the given statuses
