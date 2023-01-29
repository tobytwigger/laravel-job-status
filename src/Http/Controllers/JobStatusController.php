<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Routing\Controller;
use JobStatus\Http\Requests\JobStatusSearchRequest;
use JobStatus\Search\JobStatusSearcher;

class JobStatusController extends Controller
{
    public function search(JobStatusSearchRequest $request)
    {
        $searcher = JobStatusSearcher::query()
            ->whereJobAlias($request->input('alias'));

        if ($request->has('tags')) {
            $searcher->whereTags($request->input('tags'));
        }

        $result = $searcher->first()?->latest();
        if ($result === null) {
            abort(404, 'Could not find a matching job status');
        }

        return $result->toArray();
    }
}
