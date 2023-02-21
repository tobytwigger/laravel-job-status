<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BatchController extends Controller
{
    public function index(Request $request)
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return $query->paginateBatches(
            $request->input('page', 1),
            $request->input('per_page', 10)
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
