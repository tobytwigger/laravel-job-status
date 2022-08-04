<?php

namespace JobStatus\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use JobStatus\Http\Requests\JobStatusSearchRequest;
use JobStatus\Models\JobStatus;
use JobStatus\Trackable;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class JobStatusController extends Controller
{

    public static \Closure $resolveAuthWith;

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

        if(!class_exists($jobStatus->job_class)) {
            return response(sprintf('No job of type %s found', $jobStatus->job_class), 404);
        }
        if(!in_array(Trackable::class, class_uses_recursive($jobStatus->job_class))) {
            return response(sprintf('Job %s is not trackable.', $jobStatus->job_class), 500);
        }
        if(($jobStatus->job_class)::canSeeTracking($this->resolveAuth(), $jobStatus->getTagsAsArray()) === false) {
            throw new UnauthorizedHttpException('You cannot access this job status');
        }

        return $jobStatus;
    }

    public function resolveAuth()
    {
        $callback = static::$resolveAuthWith ?? fn() => Auth::user();
        return call_user_func($callback);
    }

}
