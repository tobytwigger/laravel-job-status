<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;

class JobSignalController
{
    public function store(JobSignalStoreRequest $request, JobStatus $jobStatus)
    {
        $modifier = JobStatusModifier::forJobStatus($jobStatus);
        $modifier->sendSignal(
            signal: $request->input('signal'),
            parameters: $request->input('parameters', []),
            cancel: $request->input('cancel_job'),
        );
    }

}
