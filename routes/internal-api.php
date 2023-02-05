<?php

use Illuminate\Support\Facades\Route;

Route::get('tracked-job', [\JobStatus\Dashboard\Http\Controllers\Api\TrackedJobController::class, 'index']);
Route::get('tracked-job/{alias}', [\JobStatus\Dashboard\Http\Controllers\Api\TrackedJobController::class, 'show']);
Route::get('job-run/{job_status_id}', [\JobStatus\Dashboard\Http\Controllers\Api\RunController::class, 'show']);
Route::get('history', \JobStatus\Dashboard\Http\Controllers\Api\HistoryController::class);
Route::post('signal/{job_status}', [\JobStatus\Http\Controllers\Api\JobSignalController::class, 'store']);
Route::post('job-run/{job_status}/retry', [\JobStatus\Http\Controllers\Api\JobRetryController::class, 'store']);
Route::get('tracked-job/{alias}/failures', [\JobStatus\Dashboard\Http\Controllers\Api\JobFailureReasonController::class, 'show']);
Route::get('batch', [\JobStatus\Dashboard\Http\Controllers\Api\BatchController::class, 'index']);
Route::get('batch/{batch}', [\JobStatus\Dashboard\Http\Controllers\Api\BatchController::class, 'show']);
