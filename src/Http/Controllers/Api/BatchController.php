<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BatchController extends Controller
{
    public function index()
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return $this->paginate(
            $query->get()->batches()
        );
    }

    public function show(JobBatch $batch)
    {
        $query = JobStatus::where('batch_id', $batch->id);
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }
        $results = $query->get();

        if ($results->count() === 0) {
            abort(403);
        }

        return $results
            ->batches()
            ->first();
    }
}
