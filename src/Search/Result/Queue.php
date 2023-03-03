<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Enums\Status;

class Queue implements Arrayable, Jsonable
{
    private string $queueName;

    private ?int $numberOfRuns;

    private array $countWithStatus;

    public function __construct(
        string $queueName,
        ?int $numberOfRuns = null,
        array $countWithStatus = []
    ) {
        $this->queueName = $queueName;
        $this->numberOfRuns = $numberOfRuns;
        $this->countWithStatus = $countWithStatus;
    }

    public function name(): ?string
    {
        return $this->queueName;
    }

    public function toArray()
    {
        return [
            'count' => $this->numberOfRuns(),
            'name' => $this->name(),
            'queued' => $this->countWithStatus(Status::QUEUED),
            'started' => $this->countWithStatus(Status::STARTED),
            'failed' => $this->countWithStatus(Status::FAILED),
            'succeeded' => $this->countWithStatus(Status::SUCCEEDED),
            'cancelled' => $this->countWithStatus(Status::CANCELLED),
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
