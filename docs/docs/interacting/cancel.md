# Cancelling a job

Once you've dispatched a job, you are able to cancel it at a later date. To do so, from the job status model, simply
call `$status->cancel()`.

## Enabling cancelling

Cancelling a job is not a first party feature in Laravel, and therefore it's not trivial to do. Within a long running
job, you will need to tell this package points at where a cancellation can happen. If the user has sent the cancellation
signal you can run some cleanup code to clean up anything your job may have done.

```php

public function handle()
{
    foreach($i = 0; $i<10;$i++) {
        $this->line('Processing number ' . $i);
        $this->offerCancel('Cancelled on #' . $i, function() {
            // Any cleanup to be done.
        });
    }
}
```

If a user cancels this job before it is complete, the `offerCancel` function will cancel the job, write a message to your app and clean up any side effects.
