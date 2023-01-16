<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Models\JobStatus;

class JobRunResult implements Arrayable, Jsonable
{

    private JobStatus $jobStatus;
    private ?JobRunResult $parent;

    public function __construct(JobStatus $jobStatus, ?JobRunResult $parent = null)
    {
        $this->jobStatus = $jobStatus;
        $this->parent = $parent;
    }

    public function hasParent(): bool
    {
        return $this->parent() !== null;
    }

    /**
     * @return JobRunResult
     */
    public function parent(): ?JobRunResult
    {
        return $this->parent;
    }

    public function toArray()
    {
        return [
            'alias' => $this->jobStatus->job_alias,
            'job_class' => $this->jobStatus->job_class,
            'percentage' => $this->jobStatus->percentage,
            'status' => $this->jobStatus->status,
            'uuid' => $this->jobStatus->uuid,
            'has_parent' => $this->hasParent(),
            'parent' => $this->parent()?->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function jobStatus(): JobStatus
    {
        return $this->jobStatus;
    }

}
