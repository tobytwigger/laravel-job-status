# Tracking a job

> Setting up tracking on Laravel jobs

## Basic Setup

By default, a job is not tracked. To set up tracking, simply add `use Trackable;` to your job class. This trait automatically starts recording information about your job.

### Job Alias

To later track down information about your job, you should set a job alias. This is a string unique to the job type that represents the job (such as `process-podcast`). This is essential if you use our frontend package.

### Tags

You can also add tags, to help you find jobs in the future. These tags should let you identify the job uniquely, so will often include things like the user and any additional models the job uses. There should only ever be one job with the given tags running at a time.

```php
class ProcessPodcast
{
    use Trackable;
    
    protected Podcast $podcast;
    
    public function handle()
    {
        // Upload and process the podcast
    }
    
    public function tags(): array
    {
        return [
            'podcast' => $this->podcast->id,
            'user' => $this->user->id
        ];
    }
    
    public function alias(): string
    {
        return 'process-podcast';
    }

}
```
