<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobStatus;

class QueueController extends Controller
{
    public function index()
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return $query->get()->queues();
    }

    public function show(string $jobStatusQueue)
    {
        $query = JobStatus::whereQueue($jobStatusQueue);
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }
        $result = $query->get();

        if ($result->count() === 0) {
            abort(404, 'No job runs found in queue: ' . $jobStatusQueue);
        }

        return $result
            ->queues()
            ->first();
    }
}
