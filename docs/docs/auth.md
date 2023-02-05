# Securing Jobs

To prevent users accessing jobs they shouldn't be able to track, you can limit the history to only a select few users.

## Limiting job access

Add a `users` method into your job that returns an array of user IDs. These users will be able to see the job status

```php
public function users(): array
{
    return [$this->user->id];
}
```

## Public jobs

If a user is not specified in `users`, they cannot view the job. By default, any user can view the job.

!!! Note
    If you have access to the job dashboard, you can see information about every job. 

    The `users` array only controls who can access the job through your app, not through the dashboard.

If a job should only be viewable to users granted access, it must be made private. Add a `public` method to return false.

```php
public function public(): bool
{
    return false;
}
```

By default, a job is public.

## Resolving the current user

When determining which jobs the user can view, we get the current user with `Auth::user()`.

If your app is set up differently, you can change how we resolve the current user.

In a service provider, add the following snippet.

```php
\JobStatus\JobStatusServiceProvider::$resolveAuthWith = function() {
    return Auth::user()->id; // Resolve the user ID however you'd like
    }
```
