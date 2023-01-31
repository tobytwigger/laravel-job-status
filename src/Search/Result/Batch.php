<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Search\Collections\JobRunCollection;

class Batch implements Arrayable, Jsonable
{
    private JobBatch $batch;

    private JobRunCollection $runs;

    public function __construct(JobBatch $batch, JobRunCollection $runs)
    {
        $this->batch = $batch;
        $this->runs = $runs;
    }

    public function batchId(): string
    {
        return $this->batch->batch_id;
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
        return $this->batch->name;
    }

    public function toArray()
    {
        return [
            'count' => $this->runs->count(),
            'runs' => $this->runs->toArray(),
            'name' => $this->name(),
            'batch_id' => $this->batchId(),
            'queued' => $this->countRunsWithStatus(Status::QUEUED),
            'started' => $this->countRunsWithStatus(Status::STARTED),
            'failed' => $this->countRunsWithStatus(Status::FAILED),
            'succeeded' => $this->countRunsWithStatus(Status::SUCCEEDED),
            'cancelled' => $this->countRunsWithStatus(Status::CANCELLED),
            'created_at' => $this->batch->created_at,
            'id' => $this->batch->id,
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
