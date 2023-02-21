<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Queries\PaginateJobs;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return (new PaginateJobs())
            ->paginate(
                $query,
                $request->input('page', 1),
                $request->input('per_page', 10)
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
