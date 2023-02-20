<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Http\Requests\Api\Run\RunSearchRequest;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class RunController extends Controller
{
    public function index(RunSearchRequest $request)
    {
        $query = JobStatus::query();

        if (!$this->shouldBypassAuth()) {
            $query->forUsers($this->resolveAuth());
        }

        if ($request->has('alias')) {
            $query->where(function (Builder $query) use ($request) {
                foreach ($request->input('alias') as $alias) {
                    $query->orWhere('alias', $alias);
                }
            });
        }

        if ($request->has('status')) {
            $query->where(function (Builder $query) use ($request) {
                foreach ($request->input('status') as $status) {
                    $query->orWhere('status', $status);
                }
            });
        }

        if ($request->has('queue')) {
            $query->where(function (Builder $query) use ($request) {
                foreach ($request->input('queue') as $queue) {
                    $query->orWhere('queue', $queue);
                }
            });
        }

        if ($request->has('batchId')) {
            $query->where(function (Builder $query) use ($request) {
                foreach ($request->input('batchId') as $batchId) {
                    $query->orWhere('batch_id', $batchId);
                }
            });
        }


        if ($request->has('tags')) {
            $query->whereTags($request->input('tags'));
        }

        return $query->paginateRuns(
            $request->input('page', 1),
            $request->input('per_page', 10)
        );
    }

    public function show(JobStatus $jobStatus)
    {
        $this->checkUserCanAccessJob($jobStatus);

        if ($jobStatus->uuid) {
            // Load all the retries
            return JobStatus::query()
                ->forUsers($this->resolveAuth())
                ->whereUuid($jobStatus->uuid)
                ->get()
                ->runs()
                ->first();
        }

        return new JobRun($jobStatus);
    }
}
