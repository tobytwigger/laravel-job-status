<?php

namespace JobStatus\Listeners;

use Illuminate\Contracts\Queue\Job;
use JobStatus\Concerns\Trackable;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;

class BaseListener
{

    protected function getJobStatusModifier(\Illuminate\Contracts\Queue\Job $job): ?JobStatusModifier
    {
        if($this->validateJob($job) === false) {
            return null;
        }
        $jobStatus = $this->getJobStatus($job);
        if($jobStatus === null) {
            return null;
        }
        return new JobStatusModifier($jobStatus);
    }

    protected function validateJob(mixed $job): bool
    {
        if(is_string($job) || $job instanceof \Closure) {
            return false;
        }
        if(!is_object($job)) {
            return false;
        }

        if(method_exists($job, 'resolveName')) {
            if(!$job->resolveName() || !class_exists($job->resolveName())) {
                return false;
            }
            if(!in_array(Trackable::class, class_uses_recursive($job->resolveName()))) {
                return false;
            }
        } else {
            if(!in_array(Trackable::class, class_uses_recursive($job))) {
                return false;
            }
        }

        return true;
    }

    protected function getJobStatus(\Illuminate\Contracts\Queue\Job $job): ?JobStatus
    {
        $jobStatus = null;

        // Try to get the job status by job id and connection name, as this is the most reliable way.
        if($job->getJobId()) {
            $jobStatus = app(JobStatusRepository::class)->getLatestByQueueReference($job->getJobId(), $job->getConnectionName());
        }
        if($jobStatus === null && $job->uuid()) {
            $jobStatus = app(JobStatusRepository::class)->getLatestByUuid($job->uuid());
        }
        if($jobStatus === null) {
            $jobStatus = JobStatus::create([
                'job_class' => $job->resolveName(),
                'job_alias' => null,
                'percentage' => 0,
                'status' => 'queued',
                'uuid' => $job->uuid(),
                'connection_name' => $job->getConnectionName(),
                'job_id' => $job->getJobId()
            ]);
        }

        return $jobStatus;
    }

}
