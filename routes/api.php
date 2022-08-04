<?php

use Illuminate\Support\Facades\Route;

Route::get('job-status', [\JobStatus\Http\Controllers\JobStatusController::class, 'search'])->name('job-status.search');
Route::resource('job-status.job-signal', \JobStatus\Http\Controllers\JobSignalController::class)->only(['store'])->scoped();
