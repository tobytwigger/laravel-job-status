<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;

class JobSignalController
{
    public function store(JobSignalStoreRequest $request, JobStatus $jobStatus)
    {
        if (!$jobStatus->canSeeTracking($this->resolveAuth())) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
        $jobStatus->signals()->create([
            'signal' => $request->input('signal'),
            'cancel_job' => $request->input('cancel_job'),
            'parameters' => $request->input('parameters', []),
        ]);
    }

    public function resolveAuth()
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user());
    }
}
