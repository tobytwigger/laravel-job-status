<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BatchController extends Controller
{

    public function index()
    {
        return JobStatus::all()
            ->batches();
    }

    public function show(JobBatch $batch)
    {
        return JobStatus::where('batch_id', $batch->id)
            ->get()
            ->batches()
            ->first();
    }
}
