<?php

namespace JobStatus\Listeners;

use JobStatus\Models\JobStatus;

/**
 * When a job has finished processing but is going to be released to try again
 *
 * - Create a new job status.
 */
class JobReleasedAfterException extends BaseListener
{

    /**
     * @param \Illuminate\Queue\Events\JobReleasedAfterException $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobReleasedAfterException $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return;
        }

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
