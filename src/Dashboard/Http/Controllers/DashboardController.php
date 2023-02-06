<?php

namespace JobStatus\Dashboard\Http\Controllers;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return view('job-status::layout');
    }
}
