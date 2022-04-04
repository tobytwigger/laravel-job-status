# Laravel Job Status

## Introduction

This package allows you to interact with and track running jobs.

## Installation

All you need to do to use this project is pull it into an existing Laravel app using composer.

```console
composer require tobytwigger/laravel-job-status
```

You can publish the configuration file by running

```console
php artisan vendor:publish --provider="JobStatus\JobStatusServiceProvider"
```

This will publish the configuration file and migrations.

## Basic Usage


- How to track a job. Adding a trait.
- Using the status
  - Retrieving the status of a job (retrieve status model and get status from it)
    - How to get a status model. Using eloquent, or directly through the job. 
      - JobStatus::forJob(Job::class) or alias.
        - ->first or ->get
      - ->whereJob('x', '=', '5') // Limiting to conditions. This should refer to a 'job conditions' table.
      - ->whereStatus()
      - ->successful()
      - ->failed();
    - Getting many or one
      - Collection methods
      - finishedCount()
      - ->successfulCount()
    - Getting the status
      - ->getStatus()
      - ->wasSuccessful()
      - ->hasFinished()
  - Sending messages
    - Send messages on a job
    - Get the latest message from a job
    - Get all messages from a job
  - Progress
    - Setting a progress percentage on a job
    - Getting the progress percentage
- Cancelling a job
  - How to cancel a job
  - How to pick up the cancellation signal 
- Sending signals
  - How to send a signal to a job (essentially a message)
  - How to check what signals have been sent and mark them as done. Use an 'onSignalName' method on the job and call it in the trait.
  - 
