<?php

namespace JobStatus\Listeners;

use Illuminate\Contracts\Queue\Job as JobContract;
use Illuminate\Events\CallQueuedListener;
use Illuminate\Queue\Jobs\Job;
use Illuminate\Support\Facades\Queue;
use JobStatus\Concerns\Trackable;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Listeners\Utils\Helper;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

/**
 * Occurs when a job is pushed to an asynchronous queue.
 *
 * Create a new JobStatus and add the tags.
 */
class JobQueued
{
    /**
     * @param \Illuminate\Queue\Events\JobQueued $event
     * @return void|bool
     */
    public function handle(\Illuminate\Queue\Events\JobQueued $event)
    {
        if (Helper::isTrackingEnabled()) {
            $job = $event->job;

            if ($job instanceof CallQueuedListener) {
                $job = app($job->displayName());
            }
            if ($this->validateJob($job) === false) {
                return true;
            }

            if (method_exists($job, 'batch')) {
                $batchModel = ($job->batch() !== null
                    ? JobBatch::firstOrCreate(
                        ['batch_id' => $job->batch()->id],
                        ['name' => $job->batch()->name]
                    )
                    : null);
            } else {
                $batchModel = null;
            }

            $jobStatus = JobStatus::create([
                'class' => get_class($job),
                'alias' => method_exists($job, 'alias') ? $job->alias() : get_class($job),
                'percentage' => 0,
                'queue' => (property_exists($job, 'job') && $job?->job && $job->job?->getQueue())
                    ? $job->job->getQueue()
                    : $job?->queue ?? $job?->queue ?? null,
                'payload' => ((property_exists($job, 'job') && $job?->job && $job->job?->getQueue())
                    ? $job->job?->payload()
                    : null),
                'batch_id' => $batchModel?->id,
                'status' => Status::QUEUED,
                'uuid' => null,
                'job_id' => $event->id,
                'connection_name' => $event->connectionName,
                'is_unprotected' => method_exists($job, 'isUnprotected') ? $job->isUnprotected() : true,
            ]);

            $modifier = JobStatusModifier::forJobStatus($jobStatus);
            $modifier->setStatus(Status::QUEUED);

            foreach ((method_exists($job, 'users') ? $job->users() : []) as $user) {
                $modifier->grantAccessTo($user);
            }

            foreach ((method_exists($job, 'tags') ? $job->tags() : []) as $key => $value) {
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

            if (property_exists($job, 'job') && $job->job instanceof \Illuminate\Contracts\Queue\Job) {
                $this->checkJobUpToDate($modifier, $job->job);
            }
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

        // True if extends Illuminate\Contracts\Queue\Job
        if (method_exists($job, 'resolveName')) {
            if (!$job->resolveName() || !class_exists($job->resolveName())) {
                return false;
            }
            if (!in_array(Trackable::class, class_uses_recursive($job->resolveName()))) {
                return config('laravel-job-status.track_anonymous', false);
            }
        } else {
            if (!in_array(Trackable::class, class_uses_recursive($job))) {
                return config('laravel-job-status.track_anonymous', false);
            }
        }

        return true;
    }

    protected function checkJobUpToDate(JobStatusModifier $jobStatusModifier, JobContract $job): void
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
}
