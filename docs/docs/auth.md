# Auth

To limit who can access tracking for certain jobs, you can define a method which returns whether the user is allowed to access the job.

Add this to your job. This method will be given a user and the tags for the job. 

```php
    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        // Using the tags and the user, return true if the user can access the job and false if they can't
        return $tags['user_id'] ?? null === $user?->id;
    }
```

## Resolving the current user

If you are using our frontend component, you need to make sure the current user can be retrieved so our API can check their access to job tracking.

By default, we use `Auth::User()`. If you retrieve your user differently, add a callback in your service provider.

```php
    \JobStatus\JobStatusServiceProvider::$resolveAuthWith = function() {
        return Auth::user(); // Resolve the user however you'd like
    }
```
