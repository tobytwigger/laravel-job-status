<?php

namespace JobStatus\Listeners;

use Illuminate\Bus\Events\BatchDispatched as BatchDispatchedEvent;
use Illuminate\Queue\Jobs\Job;
use Illuminate\Support\Facades\Queue;
use JobStatus\Concerns\Trackable;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

/**
 * Occurs when a job is pushed to an asynchronous queue.
 *
 * Create a new JobStatus and add the tags.
 */
class BatchDispatched extends BaseListener
{
    /**
     * @param BatchDispatchedEvent $event
     * @return void|bool
     */
    public function handle(BatchDispatchedEvent $event)
    {
        dd($event->batch);
        if ($this->isTrackingEnabled()) {
            $batch = JobBatch::create([
                'batch_id' => $event->batch->id,
                'name' => $event->batch->name
            ]);

            if ($this->validateJob($job) === false) {
                return true;
            }

            dd($job->batch());
            $batch = $job->batch() === null ? null : JobBatch::firstOrCreate(
                ['batch_id' => $job->batch()->id],
                ['name' => $job->batch()->name]
            );

            $jobStatus = JobStatus::create([
                'class' => get_class($job),
                'alias' => $job->alias(),
                'batch_id' => $batch?->id,
                'percentage' => 0,
                'status' => Status::QUEUED,
                'uuid' => null,
                'job_id' => $event->id,
                'connection_name' => $event->connectionName,
                'configuration' => $job->getJobStatusConfiguration(),
                'public' => $job->public(),
            ]);

            $modifier = JobStatusModifier::forJobStatus($jobStatus);
            $modifier->setStatus(Status::QUEUED);

            foreach ($job->users() as $user) {
                $modifier->grantAccessTo($user);
            }

            foreach ($job->tags() as $key => $value) {
                $jobStatus->tags()->create([
                    'key' => $key,
                    'value' => $value,
                ]);
            }

            if ($job->job) {
                $this->checkJobUpToDate($modifier, $job->job);
            }
        }
    }
}
