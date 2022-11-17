<?php

namespace JobStatus\Listeners;


use JobStatus\Models\JobStatus;

class JobReleasedAfterException extends BaseListener
{

    /**
     * Start tracking as normal, but making sure to copy across the uuid.
     *
     * @param JobReleasedAfterException $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobReleasedAfterException $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }

        $jobStatus = JobStatus::create([
            'job_class' => $modifier->getJobStatus()->job_class,
            'job_alias' => $modifier->getJobStatus()->job_alias,
            'percentage' => 0,
            'status' => 'queued',
            'uuid' => $event->job->uuid()
        ]);

        foreach ($modifier->getJobStatus()->tags() as $tag) {
            $jobStatus->tags()->create([
                'key' => $tag->key,
                'value' => $tag->value,
            ]);
        }
    }

}
