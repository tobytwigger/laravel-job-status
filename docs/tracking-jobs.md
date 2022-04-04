# Tracking a job

- Add a trait to the job
- Adding tags to help uniqueness
- Setting a job alias

```php
public function tags(): array
{
    return [
        'election' => $this->election->id,
        'user' => $this->user->id
    ];
}
```
