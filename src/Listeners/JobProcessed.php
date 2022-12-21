<?php

namespace JobStatus\Listeners;

use JobStatus\Models\JobStatus;

/**
 * When the job has finished.
 *
 * This could happen by itself if the job is successful, in which case mark the job as succeeded. It could be after an exception (job failed),
 * which could be a cancellation, so we need to respect the status of the job status unless it's running, in which case set it to sucessful.
 *
 * - Job status to successful if it's running.
 * - Set percentage to 100%.
 */
class JobProcessed extends BaseListener
{

    /**
     * @param JobProcessed $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessed $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }

        if($modifier->getJobStatus()->isRunning()) {
            // If the job is manually released, it's been retried
            if($event->job->isReleased()) {
                $this->createJobRetry();
            } elseif(!$event->job->hasFailed()) {
                $modifier->setStatus('succeeded');
            }
        }

        $modifier->setPercentage(100);
    }

    public function createJobRetry()
    {
        $modifier->setStatus('failed');
        $jobStatus = JobStatus::create([
            'job_class' => $modifier->getJobStatus()?->job_class,
            'job_alias' => $modifier->getJobStatus()?->job_alias,
            'percentage' => 0,
            'status' => 'queued',
            'uuid' => $event->job->uuid()
        ]);

        foreach ($modifier->getJobStatus()->tags()->get() as $tag) {
            $jobStatus->tags()->create([
                'key' => $tag->key,
                'value' => $tag->value,
            ]);
        }
    }

}
