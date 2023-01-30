<?php

namespace JobStatus\Dashboard\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class Authenticate
{
    public function handle(Request $request, $next)
    {
        return (app()->environment('local') || Gate::allows('viewJobStatus')) ? $next($request) : abort(403);
    }
}
