<?php

namespace JobStatus;

use Illuminate\Bus\Events\BatchDispatched;
use Illuminate\Queue\Events\JobExceptionOccurred;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\Events\JobQueued;
use Illuminate\Queue\Events\JobReleasedAfterException;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;
use JobStatus\Console\ClearJobStatusCommand;
use JobStatus\Console\ShowJobStatusSummaryCommand;
use JobStatus\Dashboard\Commands\InstallAssets;
use JobStatus\Dashboard\Http\Composers\DashboardVariables;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Queries\PaginateJobs;
use JobStatus\Search\Queries\PaginateRuns;

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
            InstallAssets::class,
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
        $this->defineBladeDirective();
        $this->setupGates();
        $this->publishDashboardAssets();
        $this->setupPaginationMethods();
        \Illuminate\Database\Eloquent\Builder::macro(
            'paginateRuns',
            fn() => app(PaginateRuns::class)->paginate($this, ...func_get_args())
        );
    }

    public function setupPaginationMethods()
    {
        foreach([
            'paginateRuns' => PaginateRuns::class,
            'paginateJobs' => PaginateJobs::class,
        ] as $name => $class) {
            \Illuminate\Database\Eloquent\Builder::macro(
                $name,
                fn() => app($class)->paginate($this, ...func_get_args())
            );
        }
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
        ], ['config', 'laravel-job-status-config']);

        $this->publishes([
            __DIR__ . '/../database/migrations/' => database_path('migrations'),
        ], 'migrations');

        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

    private function mapRoutes()
    {
        if (config('laravel-job-status.routes.api.enabled', true)) {
            Route::model('job_status_batch', JobBatch::class);
            Route::model('job_status_run', JobStatus::class);

            Route::prefix(config('laravel-job-status.routes.api.prefix'))
                ->middleware(config('laravel-job-status.routes.api.middleware', []))
                ->name('api.job-status.')
                ->group(__DIR__ . '/../routes/api.php');
        }

        if (config('laravel-job-status.dashboard.enabled', true)) {
            Route::prefix(config('laravel-job-status.dashboard.path', 'job-status'))
                ->domain(config('laravel-job-status.dashboard.domain', null))
                ->middleware(config('laravel-job-status.dashboard.middleware', 'web'))
                ->group(function () {
                    $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
                });
        }
    }

    protected function setupGates()
    {
        Gate::define('viewJobStatus', function () {
            return null;
        });
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

        app()->booted(function () {
            Queue::addConnector('database', function () {
                return new DatabaseConnectorDecorator($this->app['db']);
            });
        });
    }

    private function defineBladeDirective()
    {
        if ($this->app->resolved('blade.compiler')) {
            $this->defineJobStatusBladeDirective($this->app['blade.compiler']);
        } else {
            $this->app->afterResolving('blade.compiler', function (BladeCompiler $bladeCompiler) {
                $this->defineJobStatusBladeDirective($bladeCompiler);
            });
        }
    }

    private function defineJobStatusBladeDirective(BladeCompiler $compiler)
    {
        $compiler->directive('jobapi', function () {
            return '<?php echo sprintf("<script>%s</script>", app(\JobStatus\Share\ShareConfig::class)->toString()); ?>';
        });
    }

    private function publishDashboardAssets()
    {
        $this->loadViewsFrom(resource_path('views/vendor/job-status'), 'job-status');

        $this->publishes([
            __DIR__ . '/../public/dashboard' => public_path('vendor/job-status'),
        ], ['job-status-dashboard']);
        $this->publishes([
            __DIR__ . '/../public/dashboard/index.html' => resource_path('views/vendor/job-status/layout.blade.php'),
        ], ['job-status-dashboard']);

        View::composer('job-status::layout', DashboardVariables::class);
    }
}
