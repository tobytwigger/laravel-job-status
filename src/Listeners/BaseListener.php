<?php

namespace JobStatus\Listeners;

use Illuminate\Contracts\Encryption\Encrypter;
use Illuminate\Contracts\Queue\Job;
use Illuminate\Contracts\Queue\Job as JobContract;
use Illuminate\Support\Facades\App;
use JobStatus\Concerns\Trackable;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BaseListener
{
    protected function getJobStatusModifier(JobContract $job): ?JobStatusModifier
    {
        if ($this->validateJob($job) === false) {
            return null;
        }
        $jobStatus = $this->getJobStatus($job);
        if ($jobStatus === null) {
            return null;
        }
        $modifier = new JobStatusModifier($jobStatus);
        $this->checkJobUpToDate($modifier, $job);

        return $modifier;
    }

    protected function checkJobUpToDate(JobStatusModifier $jobStatusModifier, JobContract $job): void
    {
        if ($job->uuid() !== null && $jobStatusModifier->getJobStatus()->uuid !== $job->uuid()) {
            $jobStatusModifier->setUuid($job->uuid());
        }
        if ($job->getJobId() !== null && $jobStatusModifier->getJobStatus()->job_id !== $job->getJobId()) {
            $jobStatusModifier->setJobId($job->getJobId());
        }
    }

    protected function validateJob(mixed $job): bool
    {
        if (is_string($job) || $job instanceof \Closure) {
            return false;
        }
        if (!is_object($job)) {
            return false;
        }

        if (method_exists($job, 'resolveName')) {
            if (!$job->resolveName() || !class_exists($job->resolveName())) {
                return false;
            }
            if (!in_array(Trackable::class, class_uses_recursive($job->resolveName()))) {
                return false;
            }
        } else {
            if (!in_array(Trackable::class, class_uses_recursive($job))) {
                return false;
            }
        }

        return true;
    }

    protected function getJobStatus(JobContract $job): ?JobStatus
    {
        $jobStatus = null;

        // Try to get the job status by job id and connection name, as this is the most reliable way.
        if ($job->getJobId()) {
            $jobStatus = app(JobStatusRepository::class)->getLatestByQueueReference($job->getJobId(), $job->getConnectionName());
        }
        if ($jobStatus === null && $job->uuid()) {
            $jobStatus = app(JobStatusRepository::class)->getLatestByUuid($job->uuid());
        }
        if ($jobStatus === null && $job->getConnectionName() === 'sync') {
            if (str_starts_with($job->payload()['data']['command'], 'O:')) {
                $command = unserialize($job->payload()['data']['command']);
            } elseif (App::bound(Encrypter::class)) {
                $command = unserialize(App::make(Encrypter::class)->decrypt($job->payload()['data']['command']));
            } else {
                throw new \RuntimeException('Unable to extract job payload.');
            }
            $batchId = null;
            if(method_exists($command, 'batch') && $command->batch() !== null) {
                $batchId = JobBatch::firstOrCreate(
                    ['batch_id' => $command->batch()->id],
                    ['name' => $command->batch()->name]
                )->id;
            }
            $jobStatus = JobStatus::create([
                'class' => get_class($command),
                'alias' => $command->alias(),
                'percentage' => 0,
                'status' => Status::QUEUED,
                'uuid' => $job->uuid(),
                'batch_id' => $batchId,
                'connection_name' => $job->getConnectionName(),
                'job_id' => $job->getJobId(),
                'configuration' => $command->getJobStatusConfiguration(),
                'public' => $command->public(),
            ]);
            $modifier = JobStatusModifier::forJobStatus($jobStatus)->setStatus(Status::QUEUED);
            foreach ($command->tags() as $key => $value) {
                $jobStatus->tags()->create([
                    'key' => $key,
                    'value' => $value,
                ]);
            }

            foreach ($command->users() as $user) {
                $modifier->grantAccessTo($user);
            }
        }

        return $jobStatus;
    }

    protected function isTrackingEnabled()
    {
        return config('laravel-job-status.enabled', true);
    }
}
