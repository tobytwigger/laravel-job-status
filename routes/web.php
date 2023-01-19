<?php

\Illuminate\Support\Facades\Route::get('/{view?}', \JobStatus\Dashboard\Http\Controllers\DashboardController::class)
    ->where('view', '(.*)')
    ->name('job-status.dashboard');
