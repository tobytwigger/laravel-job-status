<?php

namespace JobStatus;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class DashboardServiceProvider extends ServiceProvider
{

    public function boot()
    {
        Gate::before(function($user, $ability) {
            if($ability === 'viewJobStatus' && app()->environment('local')) {
                return true;
            }
            return null;
        });
        Gate::define('viewJobStatus', function() {
            return false;
        });
    }

}
