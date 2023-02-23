<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Enums\Status;

class TrackedJob implements Arrayable, Jsonable
{
    private string $jobClass;

    private ?string $alias;
    private ?int $numberOfRuns;
    private array $failureReasons;
    private array $countWithStatus;

    public function jobClass(): string
    {
        return $this->jobClass;
    }

    public function __construct(
        string $jobClass,
        string $alias,
        ?int $numberOfRuns = null,
        array $failureReasons = [],
        array $countWithStatus = []
    ) {
        $this->jobClass = $jobClass;
        $this->alias = $alias;
        $this->numberOfRuns = $numberOfRuns;
        $this->failureReasons = $failureReasons;
        $this->countWithStatus = $countWithStatus;
    }

    public function toArray()
    {
        return [
            'count' => $this->numberOfRuns(),
            'alias' => $this->alias,
            'class' => $this->jobClass,
            'failure_reasons' => $this->getFailureReasons(),
            'successful' => $this->countWithStatus(Status::SUCCEEDED),
            'failed' => $this->countWithStatus(Status::FAILED),
            'started' => $this->countWithStatus(Status::STARTED),
            'queued' => $this->countWithStatus(Status::QUEUED),
            'cancelled' => $this->countWithStatus(Status::CANCELLED),
        ];
    }

    public function getFailureReasons(): array
    {
        return $this->failureReasons;
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function alias(): string
    {
        return $this->alias;
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
}
