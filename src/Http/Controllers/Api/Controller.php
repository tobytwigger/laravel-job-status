<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
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

        if (!$this->shouldBypassAuth() && !$jobRun->accessibleBy($userId)) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
    }

    public function shouldBypassAuth(): bool
    {
        if(request()->query('bypassAuth', false)) {
            if(Gate::allows('viewJobStatus')) {
                return true;
            } else {
                abort(403, 'You do not have permission to bypass auth');
            }
        }
        return false;
    }

}
