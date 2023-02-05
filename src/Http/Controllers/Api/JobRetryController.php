<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use JobStatus\Exceptions\CannotBeRetriedException;
use JobStatus\Models\JobStatus;

class JobRetryController extends Controller
{
    public function store(Request $request, JobStatus $jobStatus)
    {
        $this->checkUserCanAccessJob($jobStatus);

        try {
            $jobStatus->toRun()->retry();
        } catch (CannotBeRetriedException $e) {
            throw ValidationException::withMessages([$e->getMessage()]);
        }
    }
}
