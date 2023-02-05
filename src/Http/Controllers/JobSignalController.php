<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Controllers\Api\Controller;
use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class JobSignalController extends Controller
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

    private function authenticateUserWithJob(JobStatus $jobStatus)
    {
        $userId = $this->resolveAuth();
        $jobRun = new JobRun($jobStatus);

        if (!$jobRun->accessibleBy($userId)) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
    }
}
