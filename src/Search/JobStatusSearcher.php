<?php

namespace JobStatus\Search;

use JobStatus\Search\Result\Results;

class JobStatusSearcher
{

    private SearchParameters $searchParameters;

    public function __construct()
    {
        $this->searchParameters = new SearchParameters();
    }

    public function whereJobClass(string $jobClass): JobStatusSearcher
    {
        $this->searchParameters->setJobClass($jobClass);
        return $this;
    }

    public function whereJobAlias(string $jobAlias): JobStatusSearcher
    {
        $this->searchParameters->setJobAlias($jobAlias);
        return $this;
    }

    public function whereTag(string $key, mixed $value): JobStatusSearcher
    {
        $this->searchParameters->tags()->include($key, $value);
        return $this;
    }

    public function whereStatusIn(array $statuses): JobStatusSearcher
    {
        $this->searchParameters->setIncludeStatus($statuses);
        return $this;
    }

    public function whereStatusNotIn(array $statuses): JobStatusSearcher
    {
        $this->searchParameters->setExcludeStatus($statuses);
        return $this;
    }

    public function whereFinished(): JobStatusSearcher
    {
        $this->whereStatusIn([
            'failed', 'succeeded', 'cancelled'
        ]);
        return $this;
    }

    public function whereNotFinished(): JobStatusSearcher
    {
        $this->whereStatusIn([
            'queued', 'started'
        ]);
        return $this;
    }

    public function get(): Results
    {
        return ResultsFactory::fromQuery(
            QueryFactory::fromSearchParameters($this->searchParameters)
        );
    }

    public function whereTags(array $tags): JobStatusSearcher
    {
        foreach($tags as $key => $value) {
            $this->whereTag($key, $value);
        }
        return $this;
    }

}
