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
     * @param \Illuminate\Queue\Events\JobProcessed $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessed $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return;
        }

        if($modifier->getJobStatus()->isRunning()) {
            // If the job is manually released, it's been retried
            if($event->job->hasFailed()) {
                $modifier->setStatus('failed');
            } else {
                $modifier->setStatus('succeeded');
            }
        }

        $modifier->setPercentage(100);
    }

}
