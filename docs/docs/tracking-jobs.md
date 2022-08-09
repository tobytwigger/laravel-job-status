# Tracking a job

<<<<<<< Updated upstream
## Basic Setup

By default, we don't track jobs, since it adds a minimal overhead to your app. To track a specific job, simply add `use Trackable;` to your job class. This trait automatically starts recording information about your job.

To later track down information about your job, you should set a job 'alias'. This is a string unique to the job that represents the job. This is essential if you use our frontend package, since you can't pass class names through in JavaScript as easily as you can pass a string.

## Tags

You can also add tags, to help you find jobs in the future. These tags should let you identify the job, so will often include things like the user, and any additional models the job uses.

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
