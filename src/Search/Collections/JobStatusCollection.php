<?php

namespace JobStatus\Search\Collections;

use Illuminate\Database\Eloquent\Collection;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\Batch;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Queue;
use JobStatus\Search\Result\TrackedJob;

class JobStatusCollection extends Collection
{
    public function runs(): JobRunCollection
    {
        $queryResult = $this
            ->sortByDesc('created_at')
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
            ->sortByDesc('created_at')
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

    public function queues(): QueueCollection
    {
        $queryResult = $this
            ->sortByDesc('created_at')
            ->groupBy(['queue']);

        $queues = new QueueCollection();
        foreach ($queryResult as $queueName => $sameQueueJobs) {
            if($queueName === null) {
                continue;
            }
            // Groups of the same run
            $exactJobGrouped = $sameQueueJobs->groupBy('uuid');
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
            $queues->push(
                new Queue($queueName, $jobRuns)
            );
        }

        return $queues;
    }

    public function batches(): BatchCollection
    {
        $queryResult = $this
            ->sortByDesc('created_at')
            ->groupBy(['batch_id']);

        $batches = new BatchCollection();
        foreach ($queryResult as $batchId => $sameJobTypes) {
            if ($batchId === null || $batchId === '') {
                // Remove any results without a batch ID
                continue;
            }

            // Groups of the same run
            $exactJobGrouped = $sameJobTypes->groupBy('uuid');

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
            $batches->push(
                new Batch(JobBatch::findOrFail($batchId), $jobRuns)
            );
        }

        return $batches;
    }
}
