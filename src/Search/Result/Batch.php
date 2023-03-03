<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;

class Batch implements Arrayable, Jsonable
{
    private JobBatch $batch;
    private ?int $numberOfRuns;
    private array $countWithStatus;

    public function __construct(
        JobBatch $batch,
        ?int $numberOfRuns = null,
        array    $countWithStatus = []
    ) {
        $this->batch = $batch;
        $this->numberOfRuns = $numberOfRuns;
        $this->countWithStatus = $countWithStatus;
    }

    public function batchId(): string
    {
        return $this->batch->batch_id;
    }

    public function name(): ?string
    {
        return $this->batch->name;
    }

    public function toArray()
    {
        return [
            'count' => $this->numberOfRuns(),
            'name' => $this->name(),
            'batch_id' => $this->batchId(),
            'queued' => $this->countWithStatus(Status::QUEUED),
            'started' => $this->countWithStatus(Status::STARTED),
            'failed' => $this->countWithStatus(Status::FAILED),
            'succeeded' => $this->countWithStatus(Status::SUCCEEDED),
            'cancelled' => $this->countWithStatus(Status::CANCELLED),
            'created_at' => $this->batch->created_at,
            'id' => $this->batch->id,
        ];
    }

    public function numberOfRuns(): int
    {
        return $this->numberOfRuns ?? 0;
    }

    public function countWithStatus(Status $status): int
    {
        return array_key_exists($status->value, $this->countWithStatus)
            ? $this->countWithStatus[$status->value]
            : 0;
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
