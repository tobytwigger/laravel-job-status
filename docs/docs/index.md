# Laravel Job Status

## Introduction

In Laravel, we often run code in the **background** so a user doesn't have to wait for it. These are usually things like
sending an email, making some API calls or processing a file.

However, this has the downside that it often leaves the user **not knowing what's going on**.

The aim of this package is to give you a way to be able to **track jobs** and show your users **instant feedback** during and
after the queue execution.

## Features

- Track and retrieve information about your jobs.
- Pass messages between a job and your app/users.
- Cancel running jobs.
- Integrate with your frontend for seamless feedback from jobs.
- Supports Laravel batches.
- 
## Installation

All you need to do to use this project is pull it into an existing Laravel app using composer.

```console
composer require twigger/laravel-job-status
```

You can publish the configuration file by running

```console
php artisan vendor:publish --provider="JobStatus\JobStatusServiceProvider"
```

This will publish the configuration file and migrations.

## Basic Usage

To enable tracking on your jobs, include the `\JobStatus\Concerns\Trackable` trait.;

```php
use \JobStatus\Concerns\Trackable;

class ProcessPodcast implements ShouldQueue
{
    use Queueable, Trackable;

    public function handle()
    {
        // Process your job as normal
    }
    
}
```

Find the job in the database
```php
$jobStatus = \App\Jobs\ProcessPodcast::search()->first()
```

Show feedback to the user on the frontend

```php
@if($jobStatus->latest()->isFinished())
    <div>Your podcast has been uploaded</div>
@elseif($jobStatus->latest()->isRunning())
    <div>Your podcast is being uploaded</div>
@else
    <div>Your podcast is in the queue</div>
@endof    
```

## What's next?

- See how to [enable tracking](./enable-tracking.md) for a job.
- [Share the job progress](./js/custom-frontend.md) with your users.
- Make use of the tracking tools like [percentage progress](./features/progress.md), [messages](./features/messages.md) and [signals](./features/signals.md).
