# Signals

## Cancelling a job

Once you've dispatched a job, you are able to cancel it at a later date. To do so, from the job status model, simply
call `$status->cancel()`.

### Enabling cancelling

Cancelling a job is not a first party feature in Laravel. Within a long running job, you will need to tell this
package points at where a cancellation can happen. If the user has sent the cancellation signal you can run
some cleanup code to clean up anything your job may have done.

```php

public function handle()
{
    foreach($i = 0; $i<10;$i++) {
        $this->line('Processing number ' . $i);
        $this->checkForSignals();
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

Unlike the cancel signal, your job will not be automatically stopped for a custom signal. Throw an exception in the `on` listener to cancel job execution.

## Sending Signals

With a status model, use `$status->sendSignal('signal-type');`. This will send the signal to the job that owns the status model.

## Checking for signals

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

You can pass parameters, which will be passed to the listener.

`$status->sendSignal('user-deleted', ['deleted_user_id' => $deletedUserId]);`

```php
class UploadUserPhotos
{

    public function handle()
    {
        foreach($i = 0; $i<10;$i++) {
            $this->checkForSignals();
        }
    }
    
    public function onUserDeleted($parameters)
    {
        $deletedUserId = $parameters['deleted_user_id'];
    }
    
}
```

Pass a third parameter, a boolean, to say whether the signal should cancel the job or not.

## Use Cases

