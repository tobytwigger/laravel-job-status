<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Retry\Retrier;
use JobStatus\Search\Collections\JobRunCollection;

class JobRun implements Arrayable, Jsonable
{
    private JobStatus $jobStatus;
    private ?JobRun $parent;
    private JobRunCollection $releasedRuns;

    /**
     * @param JobStatus $jobStatus
     * @param JobRun|null $parent
     * @param JobRunCollection|null $releasedRuns
     */
    public function __construct(JobStatus $jobStatus, ?JobRun $parent = null, ?JobRunCollection $releasedRuns = null)
    {
        $this->jobStatus = $jobStatus;
        $this->parent = $parent;
        $this->releasedRuns = $releasedRuns ?? new JobRunCollection();
    }

    public function getTagsAsArray(): array
    {
        $tags = [];
        foreach ($this->jobStatus->tags as $tag) {
            if ($tag->is_indexless) {
                $tags[] = $tag->key;
            } else {
                $tags[$tag->key] = $tag->value;
            }
        }

        return $tags;
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
            'alias' => $this->jobStatus->alias,
            'class' => $this->jobStatus->class,
            'percentage' => $this->jobStatus->percentage,
            'status' => $this->jobStatus->status,
            'uuid' => $this->jobStatus->uuid,
            'has_parent' => $this->hasParent(),
            'parent' => $this->parent()?->toArray(),
            'tags' => $this->getTagsAsArray(),
            'created_at' => $this->jobStatus->created_at,
            'exception' => $this->getException()?->toArray(),
            'messages' => $this->jobStatus->messages->sortBy([['created_at', 'desc'], ['id', 'desc']])
                ->map(fn (JobMessage $message) => $message->toArray()),
            'signals' => $this->jobStatus->signals->sortBy([['created_at', 'desc'], ['id', 'desc']])
                ->map(fn (JobSignal $signal) => $signal->toArray()),
            'started_at' => $this->jobStatus->started_at,
            'finished_at' => $this->jobStatus->finished_at,
            'id' => $this->jobStatus->id,
            'batch_id' => $this->jobStatus->batch_id,
            'batch_id_uuid' => $this->jobStatus->batch?->batch_id,
            'statuses' => $this->jobStatus->statuses->sortBy([['created_at', 'desc'], ['id', 'desc']])
                ->map(fn (JobStatusStatus $status) => $status->toArray()),
            'has_payload' => $this->jobStatus->payload !== null,
            'connection_name' => $this->jobStatus->connection_name,
            'queue' => $this->jobStatus->queue,
            'released_runs' => $this->releasedRuns->toArray(),
        ];
    }

    public function getException(): ?JobException
    {
        return $this->jobStatus
            ->exception
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
        return in_array($this->jobStatus->status, Status::getFinishedStatuses());
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

    public function accessibleBy(?int $userId): bool
    {
        return $this->trackingIsUnprotected()
            || $this->jobStatus->users()->where('user_id', $userId)->exists();
    }

    public function trackingIsUnprotected(): bool
    {
        return $this->jobStatus->is_unprotected;
    }

    public function modifier(): JobStatusModifier
    {
        return new JobStatusModifier($this->jobStatus());
    }

    public function retry()
    {
        Retrier::for($this->jobStatus)->retry();
    }

    public function releasedRuns(): JobRunCollection
    {
        return $this->releasedRuns;
    }
}
