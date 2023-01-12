<?php

namespace JobStatus\Listeners;

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
        if($job->uuid()) {
            // We will create a job status when a sync job is dispatched, since these skip JobQueued
            return app(JobStatusRepository::class)->getLatestByUuid($job->uuid())
                ?? JobStatus::create([
                    'job_class' => $job->resolveName(),
                    'job_alias' => null,
                    'percentage' => 0,
                    'status' => 'queued',
                    'uuid' => $job->uuid()
                ]);
        }
        return null;
    }

}
