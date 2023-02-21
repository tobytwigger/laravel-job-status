<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Queries\PaginateBatches;

class BatchController extends Controller
{
    public function index(Request $request)
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return (new PaginateBatches())
            ->paginate(
                $query,
                $request->input('page', 1),
                $request->input('per_page', 10),
                bypassAuth: $this->shouldBypassAuth(),
                userId: $this->resolveAuth()
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
