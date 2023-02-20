<?php

use Illuminate\Support\Facades\Route;

Route::middleware(config('laravel-job-status.routes.api.middleware'))->group(function () {
    Route::get('batches', [\JobStatus\Http\Controllers\Api\BatchController::class, 'index'])
        ->name('batches.index');
    Route::get('batches/{job_status_batch}', [\JobStatus\Http\Controllers\Api\BatchController::class, 'show'])
        ->name('batches.show');

    Route::get('jobs', [\JobStatus\Http\Controllers\Api\JobController::class, 'index'])
        ->name('jobs.index');
    Route::get('jobs/overview', [\JobStatus\Http\Controllers\Api\JobController::class, 'overview'])
        ->name('jobs.overview');
    Route::get('jobs/{job_status_job_alias}', [\JobStatus\Http\Controllers\Api\JobController::class, 'show'])
        ->name('jobs.show');

    Route::get('queues', [\JobStatus\Http\Controllers\Api\QueueController::class, 'index'])
        ->name('queues.index');
    Route::get('queues/{job_status_queue}', [\JobStatus\Http\Controllers\Api\QueueController::class, 'show'])
        ->name('queues.show');

    Route::get('runs', [\JobStatus\Http\Controllers\Api\RunController::class, 'index'])
        ->name('runs.index');
    Route::get('runs/{job_status_run}', [\JobStatus\Http\Controllers\Api\RunController::class, 'show'])
        ->name('runs.show');
    Route::post('/runs/{job_status_run}/retry', [\JobStatus\Http\Controllers\Api\JobRetryController::class, 'store'])
        ->name('runs.retry');
    Route::post('/runs/{job_status_run}/signal', [\JobStatus\Http\Controllers\Api\JobSignalController::class, 'store'])
        ->name('runs.signal');
});
