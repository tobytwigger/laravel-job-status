<?php

\Illuminate\Support\Facades\Route::get('/', \JobStatus\Dashboard\Http\Controllers\DashboardController::class)
    ->name('job-status.dashboard');
