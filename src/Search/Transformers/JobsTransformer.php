<?php

namespace JobStatus\Search\Transformers;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Collections\TrackedJobCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;

class JobsTransformer
{

    public function transform(JobStatusCollection $jobStatusCollection): TrackedJobCollection
    {

        $aliases = $jobStatusCollection->groupBy('alias')
            ->keys();

        $queryResult = JobStatus::query()
            ->select('alias')
            ->selectRaw('MAX(class) as class')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->whereIn('alias', $aliases)
            ->groupBy('alias')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $trackedJobs = new TrackedJobCollection();
        foreach ($queryResult as $jobResults) {
            // Improve this to not make any additional queries.
            $trackedJobs->push(
                new TrackedJob(
                    $jobResults->class,
                    $jobResults->alias,
                    numberOfRuns: $jobResults->count,
                    failureReasons: $this->getFailureReasons($jobResults->alias),
                    countWithStatus: $this->loadCount($jobResults->alias)
                )
            );
        }

        return $trackedJobs;

    }

    private function getFailureReasons(string $alias): array
    {
        return JobException::query()
            ->withoutEagerLoads()
            ->whereHas('jobStatus', fn(Builder $query) => $query->where('alias', $alias))
            ->select('message')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('message')
            ->get()
            ->toArray();
    }

    private function loadCount(string $alias): array
    {

        return JobStatus::query()
            ->withoutEagerLoads()
            ->where('alias', $alias)
            ->groupBy('status')
            ->select('status')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->get()
            ->mapWithKeys(fn($result) => [$result->status->value => $result->count])
            ->toArray();
    }

}
