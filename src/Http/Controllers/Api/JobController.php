<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobStatus;

class JobController extends Controller
{

    public function index()
    {
        return JobStatus::get()->jobs();
    }

    public function show(string $jobStatusJobAlias)
    {
        return JobStatus::whereAlias($jobStatusJobAlias)
            ->get()
            ->jobs()
            ->first();
    }

}
