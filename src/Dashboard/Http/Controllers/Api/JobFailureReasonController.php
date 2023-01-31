<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Enums\Status;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;

class JobFailureReasonController extends Controller
{
    public function show(string $alias)
    {
        return JobStatus::whereAlias($alias)
            ->whereStatus(Status::FAILED)
            ->get()
            ->runs()
            ->filter(fn (JobRun $jobRun) => $jobRun->getException() !== null)
            ->groupBy(fn (JobRun $jobRun) => $jobRun->getException()->message)
            ->map(fn (JobRunCollection $failureGroup, string $failureReason) => [
                'message' => $failureReason,
                'count' => count($failureGroup),
            ])
            ->values();
    }
}
