<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;

class JobRun implements Arrayable, Jsonable
{
    private JobStatus $jobStatus;
    private ?JobRun $parent;

    public function __construct(JobStatus $jobStatus, ?JobRun $parent = null)
    {
        $this->jobStatus = $jobStatus;
        $this->parent = $parent;
    }

    public function getTagsAsArray()
    {
        return $this->jobStatus->tags->mapWithKeys(fn (JobStatusTag $tag) => [$tag->key => $tag->value])->toArray();
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
            'tags' => $this->getTagsAsArray(),
            'created_at' => $this->jobStatus->created_at,
            'exception' => $this->getException()?->toArray(),
            'messages' => $this->jobStatus->messages()->orderByDesc('created_at')->orderByDesc('id')->get()
                ->map(fn (JobMessage $message) => $message->toArray()),
            'signals' => $this->jobStatus->signals()->orderByDesc('created_at')->orderByDesc('id')->get()
                ->map(fn (JobSignal $signal) => $signal->toArray()),
            'started_at' => $this->jobStatus->started_at,
            'finished_at' => $this->jobStatus->finished_at,
            'id' => $this->jobStatus->id,
            'statuses' => $this->jobStatus->statuses()->orderByDesc('created_at')->orderByDesc('id')->get()
                ->map(fn (JobStatusStatus $status) => $status->toArray()),
        ];
    }

    public function getException(): ?JobException
    {
        return $this->jobStatus
            ->exception()
            ->with('previous')
            ->first()
            ?->loadAllPrevious();
    }

    public function toJson($options = 0)
    {
        return collect($this->toArray())->toJson($options);
    }

    public function jobStatus(): JobStatus
    {
        return $this->jobStatus;
    }

    public function isARetry(): bool
    {
        return $this->hasParent();
    }

    public function signals(): Collection
    {
        return $this->jobStatus->signals;
    }

    public function messagesOfType(MessageType $type)
    {
        return $this->jobStatus->messages()
            ->where('type', $type)
            ->latest()
            ->pluck('message');
    }

    public function mostRecentMessage(bool $includeDebug = false): ?string
    {
        return $this->jobStatus->messages()
            ->when($includeDebug === false, fn (Builder $query) => $query->where('type', '!=', MessageType::DEBUG))
            ->latest()
            ->orderBy('id', 'DESC')
            ->first()
            ?->message;
    }

    public function messages(): Collection
    {
        return $this->jobStatus->messages;
    }

    public function isFinished(): bool
    {
        return $this->jobStatus->status === Status::SUCCEEDED
            || $this->jobStatus->status === Status::FAILED
            || $this->jobStatus->status === Status::CANCELLED;
    }

    public function isSuccessful(): bool
    {
        return $this->jobStatus->status === Status::SUCCEEDED;
    }

    public function isFailed(): bool
    {
        return $this->jobStatus->status === Status::FAILED;
    }

    public function isCancelled(): bool
    {
        return $this->jobStatus->status === Status::CANCELLED;
    }

    public function isQueued(): bool
    {
        return $this->jobStatus->status === Status::QUEUED;
    }

    public function isRunning(): bool
    {
        return $this->jobStatus->status === Status::STARTED;
    }

    public function getPercentage(): float
    {
        return $this->jobStatus->percentage;
    }

    public function getStatus(): Status
    {
        return $this->jobStatus->status;
    }
}
