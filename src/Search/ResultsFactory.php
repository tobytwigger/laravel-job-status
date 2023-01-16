<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\JobStatusCollection;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\Result\JobRunResult;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Search\Result\SameJobTypeList;
use JobStatus\Search\Result\Results;

class ResultsFactory
{

    public static function fromQuery(Builder $query): Results
    {
        $queryResult = $query->with('tags')->get()->groupBy(['job_class']);

        $sameJobType = new Collection();
        foreach($queryResult as $jobClass => $sameJobTypes) {
            $sameJobs = $sameJobTypes->groupBy(function(JobStatus $item) {
                return $item->tags->sortBy('key')->mapWithKeys(fn(JobStatusTag $tag) => [$tag->key => $tag->value]);
            });
            foreach($sameJobs as $tags => $sameJob) {
                $sameJobGrouped = $sameJob->groupBy('uuid')->sortBy('created_at')->sortBy('id', descending: true);
                $jobStatuses = $sameJobGrouped->map(function(JobStatusCollection $jobs) {
                    return $jobs->reduce(
                        fn(?JobRunResult $result, JobStatus $jobStatus) => new JobRunResult($jobStatus, $result)
                    );
                })->sortBy(fn(JobRunResult $result) => $result->jobStatus()->created_at)->values();
                $sameJobType->push(
                    new TrackedJob($jobClass, json_decode($tags, true), $jobStatuses)
                );
            }
        }

        return new Results($sameJobType);
    }

}
