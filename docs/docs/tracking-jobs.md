# Tracking a job

> Setting up tracking on Laravel jobs

## Basic Setup

By default, a job is not tracked. 

To set up tracking, simply add `use Trackable;` to your job class and make sure your job is queueable.

!!! Queues

    Jobs that are not added to the queue are not tracked, so make sure you implement `\Illuminate\Contracts\Queue\ShouldQueue` and use the `\Illuminate\Bus\Queueable` trait.

### Job Alias

This is a string unique to the job type (such as `process-podcast`). This is essential if you use our frontend package, but is useful for understanding what jobs do at a glance.

### Tags

You can also add tags, to help you find jobs in the future. These tags should let you identify the job uniquely, so will often include things like the user and any additional models the job uses.

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
        ];
    }
    
    public function alias(): string
    {
        return 'process-podcast';
    }

}
```
