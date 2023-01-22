<?php

use Illuminate\Support\Facades\Route;

Route::get('tracked-job', [\JobStatus\Dashboard\Http\Controllers\Api\TrackedJobController::class, 'index']);
Route::get('tracked-job/{alias}', [\JobStatus\Dashboard\Http\Controllers\Api\TrackedJobController::class, 'show']);
Route::get('job-run/{job_status_id}', [\JobStatus\Dashboard\Http\Controllers\Api\RunController::class, 'show']);
