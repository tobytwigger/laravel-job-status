<?php

namespace JobStatus\Dashboard\Http\Controllers;

use Illuminate\Support\Facades\View;

class DashboardController extends Controller
{
    public function __invoke()
    {
        try {
            throw new \Exception(json_encode(View::getFinder()->find('job-status::layout')));
            return view('job-status::layout');
        } catch (\Throwable $e) {
        }
    }
}
