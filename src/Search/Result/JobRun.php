<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Str;
use JobStatus\Models\JobException;
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
            'exception' => $this->getException(),
            'messages' => $this->jobStatus->messages()->orderByDesc('created_at')->orderByDesc('id')->get(),
            'signals' => $this->jobStatus->signals()->orderByDesc('created_at')->orderByDesc('id')->get(),
            'started_at' => $this->jobStatus->started_at,
            'finished_at' => $this->jobStatus->finished_at,
            'id' => $this->jobStatus->id,
            'statuses' => $this->jobStatus->statuses()->orderByDesc('created_at')->orderByDesc('id')->get(),
        ];
    }

    private function getException(): ?JobException
    {
        $exception = $this->jobStatus->exception()->with('previous')->first();
        if($exception === null) {
            return null;
        }
        $currentException = $exception;
        $count = 2;
        while($currentException->previous !== null) {
            $string = '';
            for($i = 0; $i<=$count;$i++) {
                $string .= '.previous';
            }
            if(Str::startsWith($string, '.')) {
                $string = Str::substr($string, 1);
            }
            $exception->load($string);
            $currentException = $currentException->previous;
        }
        return $exception;
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
