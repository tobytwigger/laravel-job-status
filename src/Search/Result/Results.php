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
            'jobs' => $this->jobs()->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    /**
     * @return JobStatus[]|Collection
     */
    public function raw(): Collection
    {
        $jobs = collect();
        /** @var JobRunResult $job */
        foreach($this->jobs()->map(fn(TrackedJob $sameJobList) => $sameJobList->runs())
                    ->flatten(1) as $job) {
            do {
                $jobs[] = $job->jobStatus();
                $job = $job->parent();
            } while($job !== null);
        }
        return $jobs;
    }

    public function first(): ?TrackedJob
    {
        return $this->jobs()->first();
    }

    public function firstRun(): ?JobRunResult
    {
        return $this->first()?->latest();
    }

    public function jobOfTypeWithTags(string $jobType, array $jobTags): ?TrackedJob
    {
        return $this->jobs()
            ->filter(function(TrackedJob $sameJobList) use ($jobType, $jobTags) {
                foreach($jobTags as $key => $value) {
                    if(collect($sameJobList->tags())->has($key) === false || collect($sameJobList->tags())[$key] !== $value) {
                        return false;
                    }
                }
                return $sameJobList->jobClass() === $jobType;
            })
            ->first();
    }
}
