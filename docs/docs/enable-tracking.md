# Tracking a job

> Setting up tracking on Laravel jobs

By default, we only track the jobs that you tell us to. To track all jobs, set `track_anonymous` to `true` in your [config](./config.md).

To make the results and debugging easier, we recommend setting up your job as below with some extra data and giving it access to features such as two-way communication.

## Basic Setup

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
##### Index-less tags

You can provide an array of tags with numerical indexes from the `tags` function, for example

```php
public function tags(): array
{
    return array_merge([
        'long-running', 'uses-third-party'
    ], [
        'podcast_id' => $this->podcast->id,
        'user_id' => $this->user->id
    ]);
}
```

If you use Horizon, using index-less tags will let you continue to use the Horizon job tagging system. 

!!! warning
    Make sure your tags are different, `['podcast', 'podcast' => 1]` is invalid.

