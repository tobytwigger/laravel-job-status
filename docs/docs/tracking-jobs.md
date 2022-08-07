# Tracking a job

## Basic Setup

To track a job, simply add `use Trackable;` to your job class. This trait automatically starts recording information about your job.

To later track down information about your job, you can set a job 'alias'. This is a string unique to the job that represents the job.

## Tags

You can also add tags, to help you find jobs in the future.

What are tags useful for?

```php
class ProcessPodcast
{
    use Trackable;
    
    protected Podcast $podcast;
    
    public function handle()
    {
        // Code to handle the job in
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
