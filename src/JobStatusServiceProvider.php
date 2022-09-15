<?php

namespace JobStatus;

use Illuminate\Bus\Dispatcher as LaravelDispatcher;
use Illuminate\Contracts\Container\Container;
use Illuminate\Queue\Events\JobExceptionOccurred;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\Events\JobReleasedAfterException;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use JobStatus\Exception\JobCancelledException;

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
        $this->app->extend(
            LaravelDispatcher::class,
            fn (LaravelDispatcher $dispatcher, Container $app) => $app->make(Dispatcher::class, ['parent' => $dispatcher])
        );
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
        $this->mapQueueEventListeners();
    }

    public function mapQueueEventListeners()
    {
        $ifTracked = fn ($callback) => fn ($event) => in_array(Trackable::class, class_uses_recursive($event->job)) ? $callback($event) : null;

        Event::listen(JobProcessing::class, $ifTracked(function (JobProcessing $event) {
            $event->job->setJobStatus('started');
        }));
        Event::listen(JobProcessed::class, $ifTracked(function (JobProcessed $event) {
            $event->job->setJobStatus($event->job->hasFailed() ? 'failed' : 'succeeded');
            $event->job->setPercentage(100);
            if ($event->job->isReleased()) {
                $event->job->startTracking();
            }
        }));
        Event::listen(JobExceptionOccurred::class, $ifTracked(function (JobExceptionOccurred $event) {
            $event->exception instanceof JobCancelledException ? $event->job->setJobStatus('cancelled') : $event->job->setJobStatus('failed');
        }));
        Event::listen(JobFailed::class, $ifTracked(function (JobFailed $event) {
            $event->exception instanceof JobCancelledException ? $event->job->setJobStatus('cancelled') : $event->job->setJobStatus('failed');
            $event->exception instanceof JobCancelledException ? $event->job->warningMessage('The job has been cancelled') : $event->job->errorMessage($event->exception->getMessage());
        }));
        Event::listen(JobReleasedAfterException::class, $ifTracked(function (JobReleasedAfterException $event) {
            $event->job->setJobStatus('failed');
        }));
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
}
