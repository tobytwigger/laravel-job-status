<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;

class HistoryController extends Controller
{

    public function __invoke()
    {
        return JobStatusSearcher::query()
            ->get()
            ->runs();
    }

}
