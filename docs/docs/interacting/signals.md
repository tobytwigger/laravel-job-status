# Signals
 
Cancelling a job is one example of a signal, where the app is sending a message to the job. You can have any number of custom signals to help your app run smoothly. For example, you may signal the job when a new job is added, so you can stop or limit operation of the original job.

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
            $this->checkSignals();
            $this->offerCancel('Cancelled on #' . $i, function() {
                // Any cleanup to be done.
            });
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

## Use Cases
