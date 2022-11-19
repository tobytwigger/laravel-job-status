<?php

namespace JobStatus\Listeners;

/**
 * Fired when a job is processing. This happens when the queue worker picks up the job.
 *
 * - Mark the job as started.
 */
class JobProcessing extends BaseListener
{

    /**
     * @param JobProcessing $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessing $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }
        $this->getJobStatusModifier($event->job)->setStatus('started');
    }

}
