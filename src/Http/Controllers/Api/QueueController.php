<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Queries\PaginateQueues;

class QueueController extends Controller
{
    public function index(Request $request)
    {
        $query = JobStatus::query();
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        return (new PaginateQueues())
            ->paginate(
                $query,
                $request->input('page', 1),
                $request->input('per_page', 10)
            );
    }

    public function show(string $jobStatusQueue)
    {
        $query = JobStatus::whereQueue($jobStatusQueue);
        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }
        /** @var LengthAwarePaginator $result */
        $result = $query->paginateQueues(1, 1);

        if ($result->count() === 0) {
            abort(404, 'No job runs found in queue: ' . $jobStatusQueue);
        }

        return $result->first();
    }
}
