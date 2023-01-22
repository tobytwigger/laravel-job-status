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
     * @return Collection<JobStatus>
     */
    public function raw(): Collection
    {
        return $this->runs()->map(fn(JobRun $jobStatus) => $jobStatus->jobStatus());
    }

    /**
     * @return Collection<JobRun>
     */
    public function runs(): Collection
    {
        $jobs = collect();
        /** @var JobRun $job */
        foreach ($this->jobs()->map(fn(TrackedJob $sameJobList) => $sameJobList->runs())
                     ->flatten(1) as $job) {
            do {
                $jobs[] = $job;
                $job = $job->parent();
            } while ($job !== null);
        }
        return $jobs;
    }

    public function first(): ?TrackedJob
    {
        return $this->jobs()->first();
    }

    public function firstRun(): ?JobRun
    {
        return $this->first()?->latest();
    }

    public function jobOfTypeWithTags(string $jobType, array $jobTags): ?TrackedJob
    {
        return $this->jobs()
            ->filter(function (TrackedJob $sameJobList) use ($jobType, $jobTags) {
                foreach ($jobTags as $key => $value) {
                    if (collect($sameJobList->tags())->has($key) === false || collect($sameJobList->tags())[$key] !== $value) {
                        return false;
                    }
                }
                return $sameJobList->jobClass() === $jobType;
            })
            ->first();
    }
}
