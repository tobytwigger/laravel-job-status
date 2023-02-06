<?php

namespace JobStatus\Dashboard\Http\Controllers;

use Illuminate\Routing\Controller;
use JobStatus\Dashboard\Http\Middleware\Authenticate;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(Authenticate::class);
    }

    public function __invoke()
    {
        return view('job-status::layout');
    }
}
