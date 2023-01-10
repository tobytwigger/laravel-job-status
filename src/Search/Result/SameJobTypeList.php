<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

class SameJobTypeList implements Arrayable, Jsonable
{

    /**
     * @var array|SameJobList[]
     */
    private Collection $jobs;

    private string $jobClass;

    /**
     * @param Collection|SameJobList[] $sameJobTypeList
     */
    public function __construct(string $jobClass, array $sameJobTypeList = [])
    {
        $this->jobs = new Collection($sameJobTypeList);
        $this->jobClass = $jobClass;
    }

    /**
     * @return Collection|SameJobList[]
     */
    public function jobs(): Collection
    {
        return $this->jobs;
    }

    public function pushResults(SameJobList $sameJobs)
    {
        $this->jobs[] = $sameJobs;
    }

    public function toArray()
    {
        return [
            'job_class' => $this->jobClass,
            'count' => $this->jobs->count(),
            'jobs' => $this->jobs()->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
