<?php

namespace JobStatus\Search;

use JobStatus\Enums\Status;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Results;
use JobStatus\Search\Result\TrackedJob;

class JobStatusSearcher
{

    private SearchParameters $searchParameters;

    public function __construct()
    {
        $this->searchParameters = new SearchParameters();
    }

    public static function query(): JobStatusSearcher
    {
        return new static();
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
            Status::FAILED, Status::SUCCEEDED, Status::CANCELLED
        ]);
        return $this;
    }

    public function whereNotFinished(): JobStatusSearcher
    {
        $this->whereStatusIn([
            Status::QUEUED, Status::STARTED
        ]);
        return $this;
    }

    public function get(): Results
    {
        return ResultsFactory::fromQuery(
            QueryFactory::fromSearchParameters($this->searchParameters)
        );
    }

    public function first(): ?TrackedJob
    {
        return ResultsFactory::fromQuery(
            QueryFactory::fromSearchParameters($this->searchParameters)
        )->first();
    }

    public function whereTags(array $tags): JobStatusSearcher
    {
        foreach($tags as $key => $value) {
            $this->whereTag($key, $value);
        }
        return $this;
    }

}
