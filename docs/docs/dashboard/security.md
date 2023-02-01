# Security

Access to the job status dashboard should be protected - by default it's only accessible in the local environment.

Add the following to define users that can access the dashboard.

```php
\Gate::define('viewJobStatus', function ($user) {
    return in_array($user->email, [
        // A list of email addresses that have access
    ]);
});
```
