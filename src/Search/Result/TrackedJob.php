<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;
use JobStatus\Enums\Status;
use JobStatus\Search\Collections\JobRunCollection;

class TrackedJob implements Arrayable, Jsonable
{
    private string $jobClass;

    private ?string $alias;

    public function jobClass(): string
    {
        return $this->jobClass;
    }

    /**
     * @var Collection|JobRun[]
     */
    private Collection $runs;

    public function __construct(string $jobClass, Collection $runs, ?string $alias = null)
    {
        $this->jobClass = $jobClass;
        $this->runs = $runs;
        $this->alias = $alias;
    }

    /**
     * @return Collection|JobRun[]
     */
    public function runs(): Collection
    {
        return $this->runs;
    }

    public function toArray()
    {
        return [
            'count' => $this->runs->count(),
            'alias' => $this->alias,
            'class' => $this->jobClass,
            'runs' => $this->runs->toArray(),
            'failure_reasons' => $this->getFailureReasons(),
        ];
    }

    public function getFailureReasons(): array
    {
        return $this->runs()
            ->filter(fn (JobRun $jobRun) => $jobRun->getStatus() === Status::FAILED && $jobRun->getException() !== null)
            ->groupBy(fn (JobRun $jobRun) => $jobRun->getException()->message)
            ->map(fn (JobRunCollection $failureGroup, string $failureReason) => [
                'message' => $failureReason,
                'count' => count($failureGroup),
            ])
            ->values()->all();
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function alias(): string
    {
        return $this->alias;
    }

    public function latest(): JobRun
    {
        return $this->runs()->first();
    }

    public function numberOfRuns(): int
    {
        return $this->runs()->count();
    }
}
