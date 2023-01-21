<?php

use Illuminate\Support\Facades\Route;

Route::get('test', [\JobStatus\Dashboard\Http\Controllers\Api\ApiTestController::class, 'index']);
