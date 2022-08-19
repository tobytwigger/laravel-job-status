<?php

namespace JobStatus;

use Illuminate\Bus\Dispatcher as LaravelDispatcher;
use Illuminate\Contracts\Container\Container;
use Illuminate\Queue\Events\JobExceptionOccurred;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\QueueManager;
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
        $ifTracked = fn ($job, $callback) => in_array(Trackable::class, class_uses_recursive($job)) ? $callback() : null;

        /** @var QueueManager $queueManager */
        $queueManager = app('queue');
        $queueManager->before(fn (JobProcessing $event) => $ifTracked($event->job, fn () => $event->job->setJobStatus('started')));
        $queueManager->after(fn (JobProcessing $event) => $ifTracked($event->job, fn () => $event->job->setJobStatus('finished')));
        $queueManager->before(fn (JobProcessing $event) => $ifTracked($event->job, fn () => $event->job->setPercentage(100)));
        $queueManager->exceptionOccurred(fn (JobExceptionOccurred $event) => $ifTracked(
            $event->job,
            fn () => $event->exception instanceof JobCancelledException ? $event->job->setJobStatus('cancelled') : $event->job->setJobStatus('failed')
        ));
        $queueManager->failing(fn (JobExceptionOccurred $event) => $ifTracked(
            $event->job,
            fn () => $event->exception instanceof JobCancelledException ? $event->job->setJobStatus('cancelled') : $event->job->setJobStatus('failed')
        ));
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
