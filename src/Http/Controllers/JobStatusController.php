<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller;
use JobStatus\Http\Requests\JobStatusIndexRequest;
use JobStatus\Models\JobStatus;

class JobStatusController extends Controller
{

    public function index(JobStatusIndexRequest $request)
    {
        return JobStatus::query()
            ->when($request->has('alias'), fn(Builder $query) => $query->forJobAlias($request->input('alias')))
            ->when($request->has('class'), fn(Builder $query) => $query->forJob($request->input('class')))
            ->when($request->has('tags'), function(Builder $query) use ($request) {
                foreach($request->input('tags', []) as $key => $value) {
                    $query->whereTag($key, $value);
                }
            })
            ->get();
    }

}
