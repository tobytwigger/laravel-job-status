<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Models\JobStatus;

class JobRun implements Arrayable, Jsonable
{

    private JobStatus $jobStatus;
    private ?JobRun $parent;

    public function __construct(JobStatus $jobStatus, ?JobRun $parent = null)
    {
        $this->jobStatus = $jobStatus;
        $this->parent = $parent;
    }

    public function hasParent(): bool
    {
        return $this->parent() !== null;
    }

    /**
     * @return JobRun
     */
    public function parent(): ?JobRun
    {
        return $this->parent;
    }

    public function toArray()
    {
        return [
            'alias' => $this->jobStatus->job_alias,
            'class' => $this->jobStatus->job_class,
            'percentage' => $this->jobStatus->percentage,
            'status' => $this->jobStatus->status,
            'uuid' => $this->jobStatus->uuid,
            'has_parent' => $this->hasParent(),
            'parent' => $this->parent()?->toArray(),
            'tags' => $this->jobStatus->getTagsAsArray(),
            'created_at' => $this->jobStatus->created_at,
            'messages' => $this->jobStatus->messages()->orderByDesc('created_at')->orderByDesc('id')->get(),
            'signals' => $this->jobStatus->signals()->orderByDesc('created_at')->orderByDesc('id')->get(),
            'id' => $this->jobStatus->id,
            'statuses' => $this->jobStatus->statuses()->orderByDesc('created_at')->orderByDesc('id')->get(),
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
