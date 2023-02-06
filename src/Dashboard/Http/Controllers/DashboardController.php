<?php

namespace JobStatus\Dashboard\Http\Controllers;

use Illuminate\Support\Facades\View;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return view('job-status::layout');
    }
}
