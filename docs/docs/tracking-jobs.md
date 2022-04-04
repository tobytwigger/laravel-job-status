# Tracking a job

To track a job, simply add `use Trackable;` to your job class. This trait automatically starts recording information about your job.

To later track down information about your job, you can set a job 'alias'. This is a string unique to the job that represents the job. 

You can also add tags, to help you find jobs in the future.

```php
class ProcessPodcast
{

    protected Podcast $podcast;
    
    public function handle()
    {
        // Code to handle the job in
        $this->success('Podcast processed.');
    }
    
    public function tags(): array
    {
        return [
            'election' => $this->election->id,
            'user' => $this->user->id
        ];
    }
    
    public function alias(): string
    {
        return 'process-podcast';
    }

}
```

You can make use of the `$this->success()` or `$this->failed()` methods to force your job to mark itself as successful or failed.
