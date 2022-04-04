<?php

namespace JobStatus;

/**
 * The service provider for loading Laravel Setting
 */
class JobStatusServiceProvider extends ServiceProvider
{

    /**
     * Bind service classes into the container
     */
    public function register()
    {
    }

    /**
     * Boot the translation services
     *
     * - Allow assets to be published
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function boot()
    {
        $this->mapRoutes();
        $this->publishAssets();
    }

    /**
     * Publish any assets to allow the end user to customise the functionality of this package
     */
    private function publishAssets()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/laravel-job-status.php', 'laravel-job-status'
        );

        $this->publishes([
            __DIR__ . '/../config/laravel-job-status.php' => config_path('laravel-job-status.php'),
        ], 'config');

        $this->publishes([
            __DIR__.'/../database/migrations/' => database_path('migrations')
        ], 'migrations');

        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

    private function mapRoutes()
    {
//        if(config('laravel-job-status.routes.api.enabled', true)) {
//            Route::prefix(config('laravel-job-status.routes.api.prefix'))
//                ->middleware(config('laravel-job-status.routes.api.middleware', []))
//                ->group(__DIR__ . '/../routes/api.php');
//        }
    }

}
