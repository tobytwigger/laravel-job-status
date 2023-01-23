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
        /** @var Collection<string, Collection<JobStatus>> $queryResult */
        $queryResult = $query->with('tags')
            ->orderBy('created_at', 'DESC')
            ->get()
            ->groupBy(['job_alias'])
            ->sortKeys();

        $trackedJobs = new Collection();
        foreach($queryResult as $jobAlias => $sameJobTypes) {
            // Groups of the same run
            $exactJobGrouped = $sameJobTypes->groupBy('uuid');
            $jobClass = $sameJobTypes->filter(fn(JobStatus $jobStatus) => $jobStatus->job_alias !== null)
                ->sortByDesc('created_at')
                ->first()
                ?->job_class;

            $jobRuns = new Collection();
            foreach($exactJobGrouped as $uuid => $runs) {
                $runs = $runs->sortBy('created_at')->values();
                if($uuid === null || $uuid === '') {
                    foreach($runs as $run) {
                        $jobRuns->push( new JobRun($run, null));
                    }
                } else {
                    $jobRuns->push($runs->reduce(
                        fn(?JobRun $result, JobStatus $jobStatus, int $key) => new JobRun($jobStatus, $result)
                    ));
                }
            }
            $trackedJobs->push(
                new TrackedJob($jobClass, $jobRuns, $jobAlias)
            );
        }

        return new Results($trackedJobs);
    }

}
