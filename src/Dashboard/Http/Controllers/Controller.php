<?php

namespace JobStatus\Dashboard\Http\Controllers;

use JobStatus\Dashboard\Http\Middleware\Authenticate;

class Controller extends \Illuminate\Routing\Controller
{

    public function __construct()
    {
        $this->middleware(Authenticate::class);
    }

}
