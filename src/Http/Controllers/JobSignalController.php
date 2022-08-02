<?php

namespace JobStatus\Http\Controllers;

use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobSignalController
{

    public function store(JobSignalStoreRequest $request, JobStatus $jobStatus)
    {
        $jobStatus->signals()->create([
            'signal' => $request->input('signal'),
            'cancel_job' => $request->input('cancel_job'),
            'parameters' => $request->input('parameters', [])
        ]);
    }

}
