<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;

class JobRetryController extends Controller
{
    public function store(Request $request, JobStatus $jobStatus)
    {
        $jobStatus->toRun()->retry();
    }
}
