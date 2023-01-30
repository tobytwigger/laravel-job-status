<?php

namespace JobStatus\Search\Collections;

use Illuminate\Database\Eloquent\Collection;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;

class JobStatusCollection extends Collection
{
    public function runs(): JobRunCollection
    {
        $queryResult = $this
            ->groupBy(['uuid']);

        $jobRuns = new JobRunCollection();

        foreach ($queryResult as $uuid => $runs) {
            $runs = $runs->sortBy('created_at')->values();
            if ($uuid === null || $uuid === '') {
                foreach ($runs as $run) {
                    $jobRuns->push(new JobRun($run, null));
                }
            } else {
                $jobRuns->push($runs->reduce(
                    fn (?JobRun $result, JobStatus $jobStatus, int $key) => new JobRun($jobStatus, $result)
                ));
            }
        }

        return $jobRuns;
    }

    public function jobs(): TrackedJobCollection
    {
        $queryResult = $this
            ->groupBy(['alias']);

        $trackedJobs = new TrackedJobCollection();
        foreach ($queryResult as $jobAlias => $sameJobTypes) {
            // Groups of the same run
            $exactJobGrouped = $sameJobTypes->groupBy('uuid');
            $jobClass = $sameJobTypes->filter(fn (JobStatus $jobStatus) => $jobStatus->alias !== null)
                ->sortByDesc('created_at')
                ->first()
                ?->class;

            $jobRuns = new JobRunCollection();
            foreach ($exactJobGrouped as $uuid => $runs) {
                $runs = $runs->sortBy('created_at')->values();
                if ($uuid === null || $uuid === '') {
                    foreach ($runs as $run) {
                        $jobRuns->push(new JobRun($run, null));
                    }
                } else {
                    $jobRuns->push($runs->reduce(
                        fn (?JobRun $result, JobStatus $jobStatus, int $key) => new JobRun($jobStatus, $result)
                    ));
                }
            }
            $trackedJobs->push(
                new TrackedJob($jobClass, $jobRuns, $jobAlias)
            );
        }

        return $trackedJobs;
    }
}
