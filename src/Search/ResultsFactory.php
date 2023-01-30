<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;

class ResultsFactory
{
    public static function fromQuery(Builder $query): JobStatusCollection
    {
        return $query->with([
            'tags', 'messages', 'signals', 'statuses', 'users', 'exception'
        ])
            ->orderBy('created_at', 'DESC')
            ->get();

//        /** @var Collection<string, Collection<JobStatus>> $queryResult */
//        $queryResult = $query->with('tags')
//            ->orderBy('created_at', 'DESC')
//            ->get()
//            ->groupBy(['job_alias'])
//            ->sortKeys();
//
//        $trackedJobs = new Collection();
//        foreach ($queryResult as $jobAlias => $sameJobTypes) {
//            // Groups of the same run
//            $exactJobGrouped = $sameJobTypes->groupBy('uuid');
//            $jobClass = $sameJobTypes->filter(fn (JobStatus $jobStatus) => $jobStatus->job_alias !== null)
//                ->sortByDesc('created_at')
//                ->first()
//                ?->job_class;
//
//            $jobRuns = new Collection();
//            foreach ($exactJobGrouped as $uuid => $runs) {
//                $runs = $runs->sortBy('created_at')->values();
//                if ($uuid === null || $uuid === '') {
//                    foreach ($runs as $run) {
//                        $jobRuns->push(new JobRun($run, null));
//                    }
//                } else {
//                    $jobRuns->push($runs->reduce(
//                        fn (?JobRun $result, JobStatus $jobStatus, int $key) => new JobRun($jobStatus, $result)
//                    ));
//                }
//            }
//            $trackedJobs->push(
//                new TrackedJob($jobClass, $jobRuns, $jobAlias)
//            );
//        }
//
//        return new Results($trackedJobs);
    }
}
