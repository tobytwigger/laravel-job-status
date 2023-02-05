<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class RunController extends Controller
{

    public function index()
    {
        return JobStatus::all()
            ->runs();
    }

    public function show(int $jobStatusId)
    {
        $jobStatus = JobStatus::findOrFail($jobStatusId);
        if ($jobStatus->uuid) {
            return JobStatus::query()
                ->whereUuid($jobStatus->uuid)
                ->get()
                ->runs()
                ->first();
        }

        return new JobRun($jobStatus);
    }

}
