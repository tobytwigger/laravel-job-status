<?php

namespace JobStatus\Dashboard;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use JobStatus\Dashboard\Http\Composers\DashboardVariables;

class DashboardServiceProvider extends ServiceProvider
{

    public function register()
    {
        //
    }

    public function boot()
    {
        if(config('laravel-job-status.dashboard.enabled', false)) {
            $this->setupGates();
            $this->registerRoutes();
            $this->registerResources();
            $this->defineAssetPublishing();
        }
    }

    public function defineAssetPublishing()
    {
        $this->publishes([
            __DIR__ . '/../../public/dashboard' => public_path('vendor/job-status'),
        ], ['job-status-dashboard']);
        $this->publishes([
            __DIR__ . '/../../public/dashboard/index.html' => resource_path('views/vendor/job-status/layout.blade.php'),
        ], ['job-status-dashboard']);

        View::composer('job-status::layout', DashboardVariables::class);
    }

    protected function registerResources()
    {
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'job-status');
    }

    protected function registerRoutes()
    {
        Route::prefix(config('laravel-job-status.dashboard.path', 'job-status'))
            ->domain(config('laravel-job-status.dashboard.domain', null))
            ->middleware(config('laravel-job-status.dashboard.middleware', 'web'))
            ->group(function () {
                $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
            });

        Route::prefix(config('laravel-job-status.dashboard.path', 'job-status') . '/api')
            ->domain(config('laravel-job-status.dashboard.domain', null))
            ->middleware(config('laravel-job-status.dashboard.middleware', 'api'))
            ->group(function () {
                $this->loadRoutesFrom(__DIR__.'/../../routes/internal-api.php');
            });
    }

    protected function setupGates()
    {
        Gate::define('viewJobStatus', function() {
            return null;
        });
    }

}
