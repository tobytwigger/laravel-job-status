<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobStatusSearchRequest;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;

class JobStatusController extends Controller
{
    public function search(JobStatusSearchRequest $request)
    {
        $searcher = JobStatus::query()
            ->forUsers($this->resolveAuth())
            ->whereAlias($request->input('alias'));

        if ($request->has('tags')) {
            $searcher->whereTags($request->input('tags'));
        }

        $result = $searcher->get()->runs()->latest();
        if ($result === null) {
            abort(404, 'Could not find a matching job status');
        }

        return $result->toArray();
    }

    public function resolveAuth(): ?int
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user()?->id);
    }
}
