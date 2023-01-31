<?php

namespace JobStatus;

use Illuminate\Bus\BatchRepository;
use Illuminate\Bus\Events\BatchDispatched;
use Illuminate\Queue\Events\JobExceptionOccurred;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\Events\JobQueued;
use Illuminate\Queue\Events\JobReleasedAfterException;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use JobStatus\Console\ClearJobStatusCommand;
use JobStatus\Console\ShowJobStatusSummaryCommand;
use JobStatus\Listeners\BatchRepositoryDecorator;

/**
 * The service provider for loading Laravel Setting.
 */
class JobStatusServiceProvider extends ServiceProvider
{
    public static ?\Closure $resolveAuthWith;

    /**
     * Bind service classes into the container.
     */
    public function register()
    {
        $this->commands([
            ClearJobStatusCommand::class,
            ShowJobStatusSummaryCommand::class,
        ]);
    }

    /**
     * Boot the translation services.
     *
     * - Allow assets to be published
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function boot()
    {
        $this->publishAssets();
        $this->mapRoutes();
        $this->bindListeners();
    }

    /**
     * Publish any assets to allow the end user to customise the functionality of this package.
     */
    private function publishAssets()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/laravel-job-status.php',
            'laravel-job-status'
        );

        $this->publishes([
            __DIR__ . '/../config/laravel-job-status.php' => config_path('laravel-job-status.php'),
        ], 'config');

        $this->publishes([
            __DIR__ . '/../database/migrations/' => database_path('migrations'),
        ], 'migrations');

        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

    private function mapRoutes()
    {
        if (config('laravel-job-status.routes.api.enabled', true)) {
            Route::prefix(config('laravel-job-status.routes.api.prefix'))
                ->middleware(config('laravel-job-status.routes.api.middleware', []))
                ->group(__DIR__ . '/../routes/api.php');
        }
    }

    private function bindListeners()
    {
        Event::listen(JobQueued::class, \JobStatus\Listeners\JobQueued::class);
        Event::listen(JobProcessing::class, \JobStatus\Listeners\JobProcessing::class);
        Event::listen(JobFailed::class, \JobStatus\Listeners\JobFailed::class);
        Event::listen(JobProcessed::class, \JobStatus\Listeners\JobProcessed::class);
        Event::listen(JobReleasedAfterException::class, \JobStatus\Listeners\JobReleasedAfterException::class);
        Event::listen(JobExceptionOccurred::class, \JobStatus\Listeners\JobExceptionOccurred::class);
        Event::listen(BatchDispatched::class, \JobStatus\Listeners\BatchDispatched::class);

        app()->booted(function() {
            Queue::addConnector('database', function() {
                return new DatabaseConnectorDecorator($this->app['db']);
            });
        });
    }
}
