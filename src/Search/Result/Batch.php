<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JobStatus\Search\Collections\JobRunCollection;

class Batch implements Arrayable, Jsonable
{
    private Batch $batch;

    private JobRunCollection $runs;

    public function __construct(Batch $batch, JobRunCollection $runs)
    {
        $this->batch = $batch;
        $this->runs = $runs;
    }

    /**
     * @return JobRunCollection
     */
    public function runs(): JobRunCollection
    {
        return $this->runs;
    }

    public function toArray()
    {
        return [
            'count' => $this->runs->count(),
            'runs' => $this->runs->toArray(),
        ];
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
