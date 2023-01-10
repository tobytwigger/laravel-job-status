<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

class SameJobList implements Arrayable, Jsonable
{

    private string $jobClass;

    private array $tags;

    public function jobClass(): string
    {
        return $this->jobClass;
    }

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

    public function tags(): array
    {
        return $this->tags;
    }

    /**
     * @return Collection|JobStatusResult[]
     */
    public function jobs(): Collection
    {
        return $this->sameJobs;
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

    public function first(): JobStatusResult
    {
        return $this->jobs()->first();
    }
}
