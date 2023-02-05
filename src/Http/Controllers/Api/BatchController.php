<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BatchController extends Controller
{

    public function index()
    {
        return JobStatus::forUsers($this->resolveAuth())
            ->get()
            ->batches();
    }

    public function show(JobBatch $batch)
    {
        $results = JobStatus::where('batch_id', $batch->id)
            ->forUsers($this->resolveAuth())
            ->get();

        if($results->count() === 0){
            abort(403);
        }

        return $results
            ->batches()
            ->first();
    }

}
