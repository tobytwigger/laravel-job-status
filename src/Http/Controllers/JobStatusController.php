<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobStatusSearchRequest;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;
use JobStatus\Trackable;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class JobStatusController extends Controller
{

    public function search(JobStatusSearchRequest $request)
    {
        $jobStatus =  JobStatus::query()
            ->forJobAlias($request->input('alias'))
            ->when($request->has('tags'), function(Builder $query) use ($request) {
                foreach($request->input('tags', []) as $key => $value) {
                    $query->whereTag($key, $value);
                }
            })
            ->latest()
            ->firstOrFail()
            ->append(['lastMessage', 'isFinished']);

        if(!$jobStatus->canSeeTracking($this->resolveAuth())) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }

        return Arr::except($jobStatus->toArray(), ['updated_at', 'tags']);
    }

    public function resolveAuth()
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn() => Auth::user());
    }

}
