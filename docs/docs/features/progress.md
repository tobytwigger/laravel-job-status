# Progress

Your job can let the rest of your application know how far through processing it is. This isn't always possible, so by default the percentage will be set to `100%` when the job is finished.

If you are able to track the percentage completion of your job, call `$this->percentage($progressValue)` within the `handle` method of your job.


## Examples

### Not possible to use percentages

In this example we can't set the percentage information, since we can't track the long running part of the job. We can rely on the default behaviour to show 100% to the user when the job is complete.

```php
class SendEmail {

    public function handle() {
        $this->email->send();
    }

}
```

### Can use percentages

In this example we are set the percentage information, since we are iterating through a defined number of objects and so can calculate how far through we are.

```php
class SendEmail {

    public function handle() {
        foreach($this->users as $index => $user) {
            $percentageValue = $this->generatePercentage($index);
            $this->percentage($percentageValue);
            $this->email->sendTo($user);
        }
    }
    
    private function generatePercentage($index): int
    {
        return ($index/$this->users->count()) * 100
    }

}
```
