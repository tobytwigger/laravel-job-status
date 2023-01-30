<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;

class HistoryController extends Controller
{
    public function __invoke()
    {
        return JobStatus::all()
            ->runs();
    }
}
