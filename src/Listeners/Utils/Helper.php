<?php

namespace JobStatus\Listeners\Utils;

use Illuminate\Contracts\Encryption\Encrypter;
use Illuminate\Contracts\Queue\Job;
use Illuminate\Support\Facades\App;
use JobStatus\Concerns\Trackable;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class Helper
{
    private Job $job;

    public function __construct(Job $job)
    {
        $this->job = $job;
    }

    public static function forJob(Job $job)
    {
        return new static($job);
    }

    public static function isTrackingEnabled(): bool
    {
        return config('laravel-job-status.enabled', true);
    }

    public function getJob(): Job
    {
        return $this->job;
    }

    public function getTrackable(): null|object|string
    {
        $job = null;

        if ($this->job instanceof \Illuminate\Queue\Jobs\Job) {
            $job = $this->job->resolveName();
        }

        return $job;
    }

    protected function checkJobUpToDate(JobStatusModifier $jobStatusModifier, Job $job): void
    {
        if ($job->uuid() !== null && $jobStatusModifier->getJobStatus()->uuid !== $job->uuid()) {
            $jobStatusModifier->setUuid($job->uuid());
        }
        if ($job->getJobId() !== null && $jobStatusModifier->getJobStatus()->job_id !== $job->getJobId()) {
            $jobStatusModifier->setJobId($job->getJobId());
        }

        if ($jobStatusModifier->getJobStatus()->payload === null) {
            $jobStatusModifier->setPayload($job->payload());
        }

        if ($job->getQueue() !== null && $jobStatusModifier->getJobStatus()->queue !== $job->getQueue()) {
            $jobStatusModifier->setQueue($job->getQueue());
        }
    }

    protected function isTrackable(): bool
    {
        if (!in_array(Trackable::class, class_uses_recursive($this->getTrackable()))) {
            return config('laravel-job-status.track_anonymous', false);
        }

        return true;
    }

    protected function getJobStatus(Job $job): ?JobStatus
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
            if (method_exists($command, 'batch') && $command->batch() !== null) {
                $batchId = JobBatch::firstOrCreate(
                    ['batch_id' => $command->batch()->id],
                    ['name' => $command->batch()->name]
                )->id;
            }
            $jobStatus = JobStatus::create([
                'class' => method_exists($command, 'displayName') ? $command->displayName() : get_class($command),
                'alias' => method_exists($command, 'alias') ? $command->alias() : get_class($command),
                'queue' => $job->getQueue(),
                'payload' => $job->payload(),
                'percentage' => 0,
                'status' => Status::QUEUED,
                'uuid' => $job->uuid(),
                'batch_id' => $batchId,
                'connection_name' => $job->getConnectionName(),
                'job_id' => $job->getJobId(),
                'is_unprotected' => method_exists($command, 'isUnprotected') ? $command->isUnprotected() : true,
            ]);
            $modifier = JobStatusModifier::forJobStatus($jobStatus)->setStatus(Status::QUEUED);
            foreach ((method_exists($command, 'tags') ? $command->tags() : []) as $key => $value) {
                if (is_numeric($key)) {
                    $jobStatus->tags()->create([
                        'is_indexless' => true,
                        'key' => $value,
                        'value' => null,
                    ]);
                } else {
                    $jobStatus->tags()->create([
                        'is_indexless' => false,
                        'key' => $key,
                        'value' => $value,
                    ]);
                }
            }

            foreach ((method_exists($command, 'users') ? $command->users() : []) as $user) {
                $modifier->grantAccessTo($user);
            }
        }

        return $jobStatus;
    }

    public function getJobStatusModifier(): ?JobStatusModifier
    {
        if ($this->isTrackable() === false) {
            return null;
        }

        $jobStatus = $this->getJobStatus($this->job);

        if ($jobStatus === null) {
            return null;
        }
        $modifier = new JobStatusModifier($jobStatus);
        $this->checkJobUpToDate($modifier, $this->job);

        return $modifier;
    }
}
