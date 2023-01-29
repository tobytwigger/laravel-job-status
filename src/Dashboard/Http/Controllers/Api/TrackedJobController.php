<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Search\JobStatusSearcher;

class TrackedJobController extends Controller
{

    public function index()
    {
        return JobStatusSearcher::query()
            ->get();
    }

    public function show(string $alias)
    {
        return JobStatusSearcher::query()
            ->whereJobAlias($alias)
            ->get()
            ->first();
    }

}