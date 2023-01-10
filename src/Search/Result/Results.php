<?php

namespace JobStatus\Search\Result;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

class Results implements Arrayable, Jsonable
{

    private Collection $results;

    /**
     * @param SameJobTypeList[] $jobStatusResultsList
     */
    public function __construct(Collection $jobStatusResultsList)
    {
        $this->results = $jobStatusResultsList;
    }

    /**
     * @return SameJobTypeList[]
     */
    public function jobs(): Collection
    {
        return $this->results;
    }

    public function toArray()
    {
        return [
            'count' => $this->results->count(),
            'jobs' => $this->jobs()->toArray()
        ];
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
