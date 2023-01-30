<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;

class RunController extends Controller
{
    public function show(int $jobStatusId)
    {
        $jobStatus = JobStatus::findOrFail($jobStatusId);
        if ($jobStatus->uuid) {
            return JobStatusSearcher::query()
                ->withoutUserLimit()
                ->whereUuid($jobStatus->uuid)
                ->get()
                ->runs()
                ->first();
        }

        return new JobRun($jobStatus);
    }
}
