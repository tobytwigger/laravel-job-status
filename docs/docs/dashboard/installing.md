# Job Dashboard

The job dashboard drills down into your job history and shows you analytics alongside in-depth information about runs.

To install the required javascript to make the dashboard run, run `artisan job:install`.

You can then access the dashboard at `/job-status`

## Keeping assets up to date

To keep the js assets up to date, you should run `artisan job:install` after every update of the package.

To automate this, add it to your `composer.json` file.

```json
{
    "scripts": {
        "post-update-cmd": [
            "@php artisan job:install"
        ]
    }
}
```

## Auth

Only users with the `viewJobStatus` permission can access the dashboard. You can define these users by defining a Laravel Gate.

```php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider {
    public function boot() {
        Gate::define('viewJobStatus', function(User $user) {
            return $user->isAdmin();
        });
    }
}

```

By default, the dashboard can be accessed locally.
