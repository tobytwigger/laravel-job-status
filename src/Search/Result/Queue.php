<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Search\Collections\JobRunCollection;

class Queue implements Arrayable, Jsonable
{
    private string $queueName;

    private JobRunCollection $runs;

    public function __construct(string $queueName, JobRunCollection $runs)
    {
        $this->runs = $runs;
        $this->queueName = $queueName;
    }

    /**
     * @return JobRunCollection
     */
    public function runs(): JobRunCollection
    {
        return $this->runs;
    }

    public function name(): ?string
    {
        return $this->queueName;
    }

    public function toArray()
    {
        return [
            'count' => $this->runs->count(),
            'runs' => $this->runs->toArray(),
            'name' => $this->name(),
            'queued' => $this->countRunsWithStatus(Status::QUEUED),
            'started' => $this->countRunsWithStatus(Status::STARTED),
            'failed' => $this->countRunsWithStatus(Status::FAILED),
            'succeeded' => $this->countRunsWithStatus(Status::SUCCEEDED),
            'cancelled' => $this->countRunsWithStatus(Status::CANCELLED),
        ];
    }

    public function countRunsWithStatus(Status $status): int
    {
        return $this->runs()
            ->filter(fn (JobRun $jobRun) => $jobRun->getStatus() === $status)
            ->count();
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function latest(): JobRun
    {
        return $this->runs()->first();
    }
}
