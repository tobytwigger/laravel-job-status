<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Search\JobStatusSearcher;

class JobListController extends Controller
{

    public function index()
    {
        return JobStatusSearcher::query()
            ->get();
    }

}
