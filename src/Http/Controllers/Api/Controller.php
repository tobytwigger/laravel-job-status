<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use JobStatus\JobStatusServiceProvider;

class Controller extends \Illuminate\Routing\Controller
{

    public function resolveAuth(): ?int
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user()?->getAuthIdentifier());
    }

}
