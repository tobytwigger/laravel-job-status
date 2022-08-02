<?php

use Illuminate\Support\Facades\Route;

Route::resource('job-status', \JobStatus\Http\Controllers\JobStatusController::class)->only(['index']);
Route::resource('job-status.job-signal', \JobStatus\Http\Controllers\JobSignalController::class)->only(['store'])->scoped();
