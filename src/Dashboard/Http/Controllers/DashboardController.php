<?php

namespace JobStatus\Dashboard\Http\Controllers;

use Illuminate\Support\Facades\View;

class DashboardController extends Controller
{
    public function __invoke()
    {
//        throw new \Exception(json_encode(View::getFinder()->find('job-status::layout')));
        return view('job-status::layout');
    }
}
