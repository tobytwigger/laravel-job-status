# Auth

Having got tracking set up on your jobs, you need to make sure only those who should be able to see the job can see it. For a job that checks the price of a users books, we only want that user to be able to see the job information.

## Limiting job access

Add a `canSeeTracking` method to your job. This method will be given a user and the tags for the job, and should return whether the user can see the tracking information for the job.

```php
    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        // Using the tags and the user, return true if the user can access the job and false if they can't
        return $tags['user_id'] ?? null === $user?->id;
    }
```

## Resolving the current user

If you are using our frontend component, you need to make sure the current user can be retrieved so our API can check their access to job tracking.

By default, we use `Auth::user()`. If you retrieve your user differently, add a callback to retrieve the user in your service provider.

```php
    \JobStatus\JobStatusServiceProvider::$resolveAuthWith = function() {
        return Auth::user(); // Resolve the user however you'd like
    }
```
