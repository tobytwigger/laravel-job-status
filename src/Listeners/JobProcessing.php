<?php

namespace JobStatus\Listeners;

use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;

/**
 * Fired when a job is processing. This happens when the queue worker picks up the job.
 *
 * - Mark the job as started.
 */
class JobProcessing extends BaseListener
{

    /**
     * @param \Illuminate\Queue\Events\JobProcessing $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessing $event)
    {
        if($this->isTrackingEnabled()) {

            $modifier = $this->getJobStatusModifier($event->job);

            if ($modifier !== null) {
                $modifier->setStatus(Status::STARTED);
            }
        }
    }

}
