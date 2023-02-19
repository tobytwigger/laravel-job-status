# JavaScript

This package provides an API for you to show the progress of a job to your users. We've also created a Javascript client that makes it trivial to connect to your application and track jobs.

## Installation

To install the frontend package, you can use `npm` or `yarn`.

```npm install --save @tobytwigger/laravel-job-status-js```

```yarn add @tobytwigger/laravel-job-status-js```

You will also need to share configuration with this package. To do this, add `@jobapi` into the blade template of any page that uses the config.

## Using the client

A request has two steps - building up the request with any filters or pagination information, and telling the client if you want the result to be kept up to date.

Using either polling or websockets, we can keep any API result up to date to show your users realtime information.

### Sending a basic request

To build up a request

- Choose the type of object you want to work with
- Choose the type of request to make
- Provide any parameters

```js
import {client} from '@tobytwigger/laravel-job-status-js';

client.runs.search().whereStatus('failed').send()
  .then(response => console.log('Number of failed runs: ' + response.data.length));
```

See the [appendix](#available-methods) for all available methods.

### Listening for updates

Calling `.send()` gets the result in a promise as usual. To keep the result up to date, and therefore let your users see the job progress updating, we can listen to the result. Usually this just instructs the client to poll the API every few seconds, but it can make use of webhooks in some situations.

Provide callbacks to `listen()` to keep information up to date

```js
let isLoadingInitialResult = false;
let isUpdating = false;
let results = [];

let listener = client.runs.search().whereStatus('failed').listen()
  // Show the user a large loading screen when we're initially loading job information.
  .onStartingInitialLoad(() => isLoadingInitialResult = true)
  .onFinishingInitialLoad(() => isLoadingInitialResult = false)
  // When we're just updating the information, show a small loading wheel in the corner of the screen.
  .onStartingUpdate(() => isUpdating = true)
  .onFinishingUpdate(() => isUpdating = false)
  // Save the results when updated
  .onUpdated(newResults => results = newResults)
  // Log any errors.
  .onErrored(error => console.log(error))
  .start();
```

`results` will now contain up to date information.

The returned listener is essential for cleaning up and avoiding excess requests.

#### Cleaning Up

When the user navigates away from the code, you'll want to stop the client from listening.

When you call `start()`, you get back a listener. Call `listener.stop()` to cancel any requests and stop the listening.

## Available methods

### Runs

Interact with times that your jobs have ran

#### Search for runs

=== "Request"

    ``` js
    client.runs.search()
    .whereAlias('job-alias') // Optional call to filter by alias. Can be called multiple times.
    .whereStatus('failed') // Optional call to filter by status. Can be called multiple times.
    .send();
    ```

=== "Response"

    ``` js
    [{
        alias: string; // The alias of your job.
        class: string; // The class of the job.
        percentage: number; // The percentage of the way through the job we are.
        status: string; // The status of the job.
        uuid: string; // The UUID Laravel assigned to the job.
        parent: {...} | null; // The parent of the job. This is filled in if a job failed and this is the retry. It has the same structure as this data structure.
        created_at: Date; // When was the job status created. This is always the order in which the runs were queued.
        messages: [ // Any messages sent in the job
            {
                message: string; // The message
                type: MessageType; // The type of the message
            }
        ]; 
        signals: [ // Signals sent to the job
            {
                signal: string; // The signal sent
                created_at: Date; // When the signal was sent
                handled_at: Date; // When the signal was handled
                cancel_job: boolean; // If the signal will/did cause the job to stop
                parameters: {
                    key: value // User-defined parameters in the signal
                };
            }
        ];
        exception: { // The exception that caused the job to fail, or null if not an exception
            id: number; // An ID for the exception
            previous: JobException | null; // The previous thrown exception, or null if only one exception was thrown
            message: string; // The exception message
            line: number; // The line the error occurred on
            file: string; // The file the error occurred in 
            code: number; // The code of the exception
            stack_trace: []; // The stack trace
        };
        statuses: [ // A history of status changes for the job
            {
                status: Status; // The status
                created_at: Date; // When the status was set
            }
        ];
        started_at: Date | null; // When the job started processing
        finished_at: Date | null; // When the job finished processing
        batch_id: number; // The ID of the batch
        batch_id_uuid: string; // The UUID of the batch that Laravel assigned
        id: number; // An ID for the run
        tags: { // A list of tags the job has applied
            key: value
        };
        has_payload: boolean; // Whether we've stored the payload of the job
        connection_name: string | null; // The name of the connection the job is stored on
        queue: string | null; // The queue the job is in
        released_runs: [{...}] // Any times this run ran but was stopped by rate limiting middleware. This is an array of runs with the same structure as this data structure.
    }]
    ```

#### Get a run by ID

=== "Request"

    ``` js
    client.runs.show(44)
    .send();
    ```

=== "Response"

    ``` js
    {
        alias: string; // The alias of your job.
        class: string; // The class of the job.
        percentage: number; // The percentage of the way through the job we are.
        status: string; // The status of the job.
        uuid: string; // The UUID Laravel assigned to the job.
        parent: {...} | null; // The parent of the job. This is filled in if a job failed and this is the retry. It has the same structure as this data structure.
        created_at: Date; // When was the job status created. This is always the order in which the runs were queued.
        messages: [ // Any messages sent in the job
            {
                message: string; // The message
                type: MessageType; // The type of the message
            }
        ]; 
        signals: [ // Signals sent to the job
            {
                signal: string; // The signal sent
                created_at: Date; // When the signal was sent
                handled_at: Date; // When the signal was handled
                cancel_job: boolean; // If the signal will/did cause the job to stop
                parameters: {
                    key: value // User-defined parameters in the signal
                };
            }
        ];
        exception: { // The exception that caused the job to fail, or null if not an exception
            id: number; // An ID for the exception
            previous: JobException | null; // The previous thrown exception, or null if only one exception was thrown
            message: string; // The exception message
            line: number; // The line the error occurred on
            file: string; // The file the error occurred in 
            code: number; // The code of the exception
            stack_trace: []; // The stack trace
        };
        statuses: [ // A history of status changes for the job
            {
                status: Status; // The status
                created_at: Date; // When the status was set
            }
        ];
        started_at: Date | null; // When the job started processing
        finished_at: Date | null; // When the job finished processing
        batch_id: number; // The ID of the batch
        batch_id_uuid: string; // The UUID of the batch that Laravel assigned
        id: number; // An ID for the run
        tags: { // A list of tags the job has applied
            key: value
        };
        has_payload: boolean; // Whether we've stored the payload of the job
        connection_name: string | null; // The name of the connection the job is stored on
        queue: string | null; // The queue the job is in
    }
    ```

#### Retry a run

=== "Request"

    ``` js
    client.runs.retry(44)
    .send();
    ```

=== "Response"

    ``` js
    {}
    ```

#### Send a signal

=== "Request"

    ``` js
    client.runs.signal(
        jobStatusId: number, // The ID of the run model
        signal: string, // The signal to send, e.g. 'cancel'
        cancel: boolean, // Whether to cancel the job when the signal runs.
        parameters: { key: value } // Parameters to pass to the job through the signal
    )
    .send();
    ```

=== "Response"

    ``` js
    {}
    ```

### Jobs

Interact with the jobs in your Laravel app

#### Search for jobs

=== "Request"

    ``` js
    client.jobs.search()
        .send();
    ```

=== "Response"
    ``` js
    [{
        class: string; // The class of the job
        alias: string; // The alias of the job
        runs: JobRun[]; // An array of times the job has ran.
        count: number; // The number of times this job has ran
    }]
    ```

    See the [Run Show](#run-show) documentation for the structure of the job run


#### Show a job by alias/class

=== "Request"

    ``` js
    client.jobs.show('my-job-alias-or-class') // Pass the job alias or the job class to retrieve the job.
        .send();
    ```

=== "Response"
    ``` js
    {
        class: string; // The class of the job
        alias: string; // The alias of the job
        runs: JobRun[]; // An array of times the job has ran.
        count: number; // The number of times this job has ran
    }
    ```

    See the [Run Show](#run-show) documentation for the structure of the job run

### Batches

Retrieve information about the batches that have ran through your queue system

#### Search for batches

=== "Request"

    ``` js
    client.batches.search()
        .send();
    ```

=== "Response"
    ``` js
    [{
        count: number; // The number of jobs in this batch
        runs: JobRun[]; // The runs in this batch
        batch_id: string; // The UUID of this batch that Laravel assigned
        name: string | null; // The name of this batch
        created_at: Date; // When this batch was created
        queued: number; // How many runs in the batch are queued
        started: number; // How many runs in the batch are started
        failed: number; // How many runs in the batch are failed
        succeeded: number; // How many runs in the batch are succeeded
        cancelled: number; // How many runs in the batch are cancelled
    }]
    ```

#### Get a batch by ID



=== "Request"

    ``` js
        client.batches.show(24) // This is the ID of the batch from this package, and not the UUID.
        .send();
    ```

=== "Response"
    ``` js
    {
        count: number; // The number of jobs in this batch
        runs: JobRun[]; // The runs in this batch
        batch_id: string; // The UUID of this batch that Laravel assigned
        name: string | null; // The name of this batch
        created_at: Date; // When this batch was created
        queued: number; // How many runs in the batch are queued
        started: number; // How many runs in the batch are started
        failed: number; // How many runs in the batch are failed
        succeeded: number; // How many runs in the batch are succeeded
        cancelled: number; // How many runs in the batch are cancelled
    }
    ```
