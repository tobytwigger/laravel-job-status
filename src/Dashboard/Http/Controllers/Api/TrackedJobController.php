<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Models\JobStatus;

class TrackedJobController extends Controller
{
    public function index()
    {
        return JobStatus::get()->jobs();
    }

    public function show(string $alias)
    {
        return JobStatus::whereAlias($alias)
            ->get()
            ->jobs()
            ->first();
    }
}
