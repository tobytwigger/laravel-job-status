<?php

namespace JobStatus\Listeners;

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
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            $modifier = new JobStatusModifier(JobStatus::create([
                'job_class' => get_class($event->job),
                'job_alias' => $event->job->alias(),
                'percentage' => 0,
                'status' => 'queued',
                'uuid' => $event->id
            ]));
        }
        $modifier->setStatus('started');
    }

}
