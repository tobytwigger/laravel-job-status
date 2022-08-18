# Laravel Job Status

## Introduction

In Laravel, we often run code in the **background** so a user doesn't have to wait for it. These are usually things like
sending an email, making some API calls or processing a file.

However, this has the downside that it often leaves the user **not knowing what's going on**.

The aim of this package is to give you a way to be able to **track jobs** and show your users **instant feedback** during and
after the queue execution.

It also extends jobs to let you pass **messages** between your job and your app and **cancel** running jobs.

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

See the [Vue Integration](./vue.md) documentation for information on installing our frontend component.

## Basic Usage

Enable tracking on your jobs

```php
<?php

class ProcessPodcast implements ShouldQueue
{
    use Queueable, Trackable;

    protected Podcast $podcast;

    public function handle()
    {
        // Upload and process the podcast
    }

    /**
    * Uniquely identifies the job to let you retrieve it later
    * @return array
     */
    public function tags(): array
    {
        return [
            'podcast' => $this->podcast->id,
            'user' => $this->user->id
        ];
    }
    
    /**
     * A name for the job to help you identify it from the frontend
     * @return string
     */
    public function alias(): string
    {
        return 'process-podcast';
    }

}
```

Let the Vue component know what job it should track

```vue

<job-status job="process-podcast" :tags="{podcast: podcastId}">
    <template v-slot:default="{status, lastMessage, complete, cancel, signal}">
        <spinner v-if="complete === false"></spinner>
        <p>The status of the job is {{status}}</p>
        <p>{{lastMessage}}</p>
        <v-button @click="cancel" type="danger">Cancel</v-button>
    </template>
    <template v-slot:empty>
        Upload a podcast to get started
    </template>
</job-status>
```

## Roadmap

We've got a few features still to release, including

- A dashboard for viewing job stats
- Scheduled command for pruning
- Manually retrying jobs
- Websockets for keeping jobs up to date
- Table frontend component
- Support Vue 3 & other frameworks

See open issues on github for more information.

## What's next?

- See how to [enable tracking](./tracking-jobs.md) for a job.
- [Share the job progress](./vue.md) with your users.
- Make use of the tracking tools like [percentage progress](./progress.md), [messages](./messages.md) and [signals](./signals.md).
