<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class JobSignalController
{
    public function store(JobSignalStoreRequest $request, JobStatus $jobStatus)
    {
        $this->authenticateUserWithJob($jobStatus);

        $modifier = JobStatusModifier::forJobStatus($jobStatus);
        $modifier->sendSignal(
            signal: $request->input('signal'),
            parameters: $request->input('parameters', []),
            cancel: $request->input('cancel_job'),
        );
    }

    public function resolveAuth(): ?int
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user()?->id);
    }

    private function authenticateUserWithJob(JobStatus $jobStatus)
    {
        $userId = $this->resolveAuth();
        $jobRun = new JobRun($jobStatus);

        if(
            ($userId === null && !$jobStatus->public)
            || $userId !== null && !$jobRun->accessibleBy($userId)
        ) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
    }
}
