# Laravel Job Status

## Introduction

In Laravel, we often run code in the background so a user doesn't have to wait for it. These are often things like sending an email, making some API calls or processing a file.

However, this has the downside that it often leaves the user in the lurch. They're not sure if the job has been done or if it's still running, and Laravel doesn't give you an easy way to track this.

The aim of this package is to give you a minimal-setup to be able to track jobs and show your users instant feedback when the job is done.

It also extends jobs to let you pass messages between your job and your app, as well as provides you with a dashboard for seeing information about your jobs no matter which driver you're using.

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

Todo. An example job, showing the tracking on the FE.

## Roadmap

We've got a few features still to release, including

- A dashboard for viewing job stats
- Scheduled command for pruning
- Manually retrying jobs
- Websockets for keeping jobs up to date
- Table frontend component
- Support Vue 3
