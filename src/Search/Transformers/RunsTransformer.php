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
        $uuids = [];
        $jobReferences = [];
        $jobStatusCollection->each(function(JobStatus $jobStatus) use (&$uuids, &$jobReferences) {
            if($jobStatus->uuid !== null) {
                $uuids[] = $jobStatus->uuid;
            } else {
                $jobReferences[] = ['id' => $jobStatus->job_id, 'connection_name' => $jobStatus->connection_name];
            }
        });

        $jobs = JobStatus::whereIn('uuid', $uuids)
            ->orWhere(function(Builder $query) use ($jobReferences) {
                foreach($jobReferences as $jobReference) {
                    $query->orWhere(fn(Builder $subQuery) => $subQuery
                        ->where('job_id', $jobReference['id'])
                        ->where('connection_name', $jobReference['connection_name'])
                    );
                }
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $queryResult = $jobs->groupBy(['uuid']);

        $jobRuns = new JobRunCollection();

        foreach ($queryResult as $uuid => $runs) {
            if ($uuid === null || $uuid === '') {
                foreach ($runs as $run) {
                    $jobRuns->push(new JobRun($run, null));
                }
            } else {
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
        }

        return $jobRuns;
    }

}
