<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class Controller extends \Illuminate\Routing\Controller
{

    public function resolveAuth(): ?int
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user()?->getAuthIdentifier());
    }

    protected function checkUserCanAccessJob(JobStatus $jobStatus)
    {
        $userId = $this->resolveAuth();
        $jobRun = new JobRun($jobStatus);

        if (!$jobRun->accessibleBy($userId)) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
    }

}
