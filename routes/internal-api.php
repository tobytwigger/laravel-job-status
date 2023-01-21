<?php

use Illuminate\Support\Facades\Route;

//Route::get('test', [\JobStatus\Dashboard\Http\Controllers\Api\ApiTestController::class, 'index']);
Route::get('job-list', [\JobStatus\Dashboard\Http\Controllers\Api\JobListController::class, 'index']);
