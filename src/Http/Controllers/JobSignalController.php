<?php

namespace JobStatus\Http\Controllers;

use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobSignalController
{

    public function store(JobSignalStoreRequest $request, JobSignal $jobSignal)
    {
        return JobStatus::paginate();
    }

}
