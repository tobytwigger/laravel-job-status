<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Search\JobStatusSearcher;

class HistoryController extends Controller
{
    public function __invoke()
    {
        return JobStatusSearcher::query()
            ->get()
            ->runs();
    }
}
