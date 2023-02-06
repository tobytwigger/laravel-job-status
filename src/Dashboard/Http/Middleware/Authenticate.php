<?php

namespace JobStatus\Dashboard\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class Authenticate
{
    public function handle(Request $request, $next)
    {
        if(config('job-status.dashboard.enabled', true) === false) {
            abort(403);
        }
        return
            (
                app()->environment('local')
                || Gate::allows('viewJobStatus')
            )
                ? $next($request)
                : abort(403);
    }
}
