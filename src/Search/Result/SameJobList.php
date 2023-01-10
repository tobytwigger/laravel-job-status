<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

class SameJobList implements Arrayable, Jsonable
{

    private string $jobClass;
    private array $tags;

    /**
     * @var Collection|JobStatusResult[]
     */
    private Collection $sameJobs;

    public function __construct(string $jobClass, array $tags, Collection $sameJobs)
    {
        $this->jobClass = $jobClass;
        $this->tags = $tags;
        $this->sameJobs = $sameJobs;
    }

    public function toArray()
    {
        return [
            'count' => $this->sameJobs->count(),
            'tags' => $this->tags,
            'job_class' => $this->jobClass,
            'jobs' => $this->sameJobs->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
