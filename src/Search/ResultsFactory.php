<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\JobStatusCollection;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Search\Result\SameJobTypeList;
use JobStatus\Search\Result\Results;

class ResultsFactory
{

    public static function fromQuery(Builder $query): Results
    {
        $queryResult = $query->with('tags')->orderBy('created_at', 'DESC')->get()->groupBy(['job_class']);

        $trackedJobs = new Collection();
        foreach($queryResult as $jobClass => $sameJobTypes) {
            // Groups of the same run
            $exactJobGrouped = $sameJobTypes->groupBy('uuid');
            $jobAlias = $sameJobTypes->filter(fn(JobStatus $jobStatus) => $jobStatus->job_alias !== null)
                ->sortByDesc('created_at')
                ->first()
                ?->job_alias;

            $jobRuns = new Collection();
            foreach($exactJobGrouped as $runs) {
                $jobRuns->push($runs->sortBy('created_at')->reduce(
                    fn(?JobRun $result, JobStatus $jobStatus) => new JobRun($jobStatus, $result)
                ));
            }
            $trackedJobs->push(
                new TrackedJob($jobClass, $jobRuns, $jobAlias)
            );
        }

        return new Results($trackedJobs);
    }

}
