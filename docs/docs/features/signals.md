# Signals

Signals are the opposite of messages - they let your app communicate with your job.

## Cancelling a job

Once you've dispatched a job, you are able to cancel it at a later date. This can be done through the [dashboard](./../dashboard/runs.md#cancelling--retrying), [programatically](./../advanced/php-history.md#signals) or through the [JS API client](./../js/js.md#send-a-signal).

### Enabling cancelling

Cancelling a job is not a first party feature in Laravel. Within a long-running job, you will need to tell this
package when a cancellation can happen. If the user has sent the cancellation signal you can run
some cleanup code to clean up anything your job may have done.

```php

public function handle()
{
    foreach($i = 0; $i<10;$i++) {
        $this->status()->line('Processing number ' . $i);
        $this->checkForSignals(); // Check if the user has cancelled the job
    }
    
    public function onCancel()
    {
        // Clean up code to run if the job is cancelled.
    }
}
```

If a user cancels this job before it is complete, the `checkForSignals` function will cancel the job and clean up any side effects by calling the `onCancel` method.

## Custom Signals

Cancelling a job is one example of a signal, where the app is sending a message to the job. You can have any number of custom signals to help your app run smoothly. For example, you may signal the job when a new job is added, so you can stop or limit operation of the original job.

### Sending Signals

This can be done [programatically](./../advanced/php-history.md#signals) or through the [JS API client](./../js/js.md#send-a-signal).

#### Signal parameters

With custom signals, you can also send parameters to the job. For example, a job that checks the price of all the books a user owns may want to be notified if a new book is added during processing. To avoid us having to redo all the books, the signal can contain information about the new book allowing us to add it to the queue.

```php
$jobRun->modifier()->sendSignal('book-added', ['book_id' => $bookId]);
````

```php
class CheckBookPrice
{
    protected Collection $books;
    
    public function handle()
    {
        foreach($this->books as $bookId) {
            $this->priceChecker->checkFor($bookId)
            $this->checkForSignals();
        }
    }
    
    public function onBookAdded($parameters)
    {
        $this->books->push($parameters['book_id']);
    }

    public function tags(): array
    {
        return ['user_id' => $this->user->id];
    }
    
    public function alias(): string
    {
        return 'check-book-price';
    }
    
}
```

### Checking for signals

To make your job respond to these signals, you can add `onSignalName` methods, which will be executed when the signal is received. It's important to note that you need to regularly call `$this->checkSignals()` in your job to let this package check the status of any signals.

```php
class MyJob
{

    public function handle()
    {
        foreach($i = 0; $i<10;$i++) {
            $this->checkForSignals();
        }
    }
    
    public function onCancel()
    {
        // Code to clean up the job.
    }
    
    public function onUserLoggedOut()
    {
        // Code to execute when we receive a 'user-logged-out' signal.
    }

}
```

## Stopping jobs

If you want to stop your job on being sent a signal, you have two choices.

You can throw an exception in the `onSignalName` method, which will mark your job as a failure.

Or you can pass `cancelJob: true` to the `sendSignal` function to cancel the job after the cleanup has finished.
```php
$jobRun->modifier()->sendSignal('user-deleted', ['user_id' => $user->id], cancelJob: true);
```
