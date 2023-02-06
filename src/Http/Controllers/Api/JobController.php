<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobStatus;

class JobController extends Controller
{
    public function index()
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return $query->get()->jobs();
    }

    public function show(string $jobStatusJobAlias)
    {
        $query = JobStatus::whereAlias($jobStatusJobAlias);
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }
        $result = $query->get();

        if ($result->count() === 0) {
            abort(404, 'No job runs found for alias: ' . $jobStatusJobAlias);
        }

        return $result
            ->jobs()
            ->first();
    }
}
