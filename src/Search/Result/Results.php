<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;
use JobStatus\Models\JobStatus;

class Results implements Arrayable, Jsonable
{
    private Collection $results;

    /**
     * @param TrackedJob[] $jobStatusResultsList
     */
    public function __construct(Collection $jobStatusResultsList)
    {
        $this->results = $jobStatusResultsList;
    }

    /**
     * Get all the jobs that had runs matching the search.
     *
     * @return TrackedJob[]|Collection
     */
    public function jobs(): Collection
    {
        return $this->results;
    }

    public function toArray()
    {
        return [
            'count' => $this->results->count(),
            'jobs' => $this->jobs()->toArray(),
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    /**
     * Get all the matching underlying database models, including retrues.
     *
     * @return Collection<JobStatus>
     */
    public function raw(): Collection
    {
        return $this->runsAndRetries()
            ->map(fn (JobRun $jobStatus) => $jobStatus->jobStatus());
    }


    /**
     * Get all the runs that matched this search.
     *
     * @return Collection<JobRun>
     */
    public function runs(): Collection
    {
        return $this->jobs()
            ->map(fn (TrackedJob $sameJobList) => $sameJobList->runs())
            ->flatten(1)
            ->sortByDesc(fn (JobRun $run) => $run->jobStatus()->created_at->getPreciseTimestamp(3))
            ->values();
    }

    /**
     * Get all the runs without grouping retries together.
     *
     * @return Collection<JobRun>
     */
    public function runsAndRetries(): Collection
    {
        $jobs = collect();
        /** @var JobRun $job */
        foreach ($this->runs() as $job) {
            do {
                $jobs[] = $job;
                $job = $job->parent();
            } while ($job !== null);
        }

        return $jobs->sortByDesc(fn (JobRun $jobRun) => $jobRun->jobStatus()->created_at);
    }

    /**
     * Get the first matching job.
     *
     * @return TrackedJob|null
     */
    public function first(): ?TrackedJob
    {
        return $this->jobs()->first();
    }

    /**
     * How many jobs are there?
     *
     * @return int
     */
    public function count(): int
    {
        return $this->jobs()->count();
    }

    /**
     * How many runs are there?
     *
     * @return int
     */
    public function runCount(): int
    {
        return $this->runs()->count();
    }

    /**
     * Get the first matching run.
     *
     * @return JobRun|null
     */
    public function firstRun(): ?JobRun
    {
        return $this->first()?->latest();
    }
}
