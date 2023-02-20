<?php

namespace JobStatus\Http\Controllers\Api;

use JobStatus\Http\Requests\Api\Job\ListJobsRequest;
use JobStatus\Http\Resources\Job\JobOverviewResource;
use JobStatus\Models\JobStatus;

class JobController extends Controller
{
    public function overview(ListJobsRequest $request)
    {
        $query = JobStatus::setEagerLoads([])->selectRaw(
            'MAX(created_at) as created_at, '.
            'alias, '.
            'MAX(class) as class, '.
            'MAX(uuid) as uuid, '.
            'COUNT(id) as runs, '.
            'SUM(IF(status = "succeeded", 1, 0)) as succeeded, '.
            'SUM(IF(status = "failed", 1, 0)) as failed, '.
            'SUM(IF(status = "queued", 1, 0)) as queued, '.
            'SUM(IF(status = "running", 1, 0)) as running, '.
            'SUM(IF(status = "cancelled", 1, 0)) as cancelled'
        );
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        $query->groupBy('alias');

        if ($request->has('sortBy')) {
            $query->withCustomOrder($request->sortBy(), $request->sortByDirection() ?? 'desc');
        }
        else {
            $query->latest();
        }

        return response()->json(
            $query->paginate($request->perPage())
                ->through(fn (JobStatus $status) => new JobOverviewResource($status))
        );
    }

    public function index(ListJobsRequest $request)
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        if($request->has('sortBy')) {
            $query->withCustomOrder($request->sortBy(), $request->sortByDirection() ?? 'desc');
        }
        else {
            $query->latest();
        }

        return $this->paginate(
            $query->get()->jobs()
        );
    }

    public function show(string $jobStatusJobAlias)
    {
        $query = JobStatus::whereAlias($jobStatusJobAlias);
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }
        $result = $query->get();

        if ($result->count() === 0) {
            abort(404, 'No job runs found for alias: ' . $jobStatusJobAlias);
        }

        return $result
            ->jobs()
            ->first();
    }
}
