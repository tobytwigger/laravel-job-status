<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobStatus;

class JobController extends Controller
{

    public function index()
    {
        return JobStatus::forUsers($this->resolveAuth())->get()->jobs();
    }

    public function show(string $jobStatusJobAlias)
    {
        $result = JobStatus::whereAlias($jobStatusJobAlias)
            ->forUsers($this->resolveAuth())
            ->get();

        if($result->count() === 0){
            abort(404, 'No job runs found for alias: ' . $jobStatusJobAlias);
        }

        return $result
            ->jobs()
            ->first();
    }

}
