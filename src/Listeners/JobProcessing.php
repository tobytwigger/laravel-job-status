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
     * @param \Illuminate\Queue\Events\JobProcessing $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessing $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return;
        }
        $this->getJobStatusModifier($event->job)->setStatus('started');
    }

}
