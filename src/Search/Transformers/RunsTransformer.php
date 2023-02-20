<?php

namespace JobStatus\Search\Transformers;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Enums\Status;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Result\JobRun;

class RunsTransformer
{

    public function transform(JobStatusCollection $jobStatusCollection): JobRunCollection
    {
        $selectors = $jobStatusCollection->map(fn(JobStatus $jobStatus) => $jobStatus->selector);

        $jobs = JobStatus::whereIn('selector', $selectors)
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $queryResult = $jobs->groupBy(['selector']);

        $jobRuns = new JobRunCollection();

        foreach ($queryResult as $selector => $runs) {
            $jobRun = null;
            $released = new JobRunCollection();
            foreach ($runs->reverse() as $run) {
                if ($run->status === Status::RELEASED) {
                    $released->push(new JobRun($run));
                } else {
                    $jobRun = new JobRun($run, $jobRun, $released);
                    $released = new JobRunCollection();
                }
            }
            if ($jobRun !== null) {
                $jobRuns->push($jobRun);
            }
        }

        return $jobRuns;
    }

}
