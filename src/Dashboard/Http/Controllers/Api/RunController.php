<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;

class RunController extends Controller
{

    public function show(int $jobStatusId)
    {
        $jobStatus = JobStatus::findOrFail($jobStatusId);
        if($jobStatus->uuid) {
            return JobStatusSearcher::query()
                ->whereUuid($jobStatus->uuid)
                ->get()
                ->firstRun();
        } else {
            return new JobRun($jobStatus);
        }
    }

}
