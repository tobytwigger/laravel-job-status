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
        $run = JobStatusSearcher::query()
            ->whereUuid($jobStatus->uuid)
            ->get()
            ->firstRun();
        while($run !== null && $run->jobStatus()->id !== $jobStatus->id) {
            $run = $run->parent();
        }
        if($run === null) {
            throw new ModelNotFoundException('No matching job status found');
        }
        return $run;
    }

}
