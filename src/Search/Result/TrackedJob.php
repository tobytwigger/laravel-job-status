<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

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
            'runs' => $this->runs->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function alias(): string
    {
        return $this->jobAlias();
    }

    public function jobAlias(): string
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
