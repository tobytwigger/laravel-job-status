<?php

namespace JobStatus\Listeners;

use JobStatus\Models\JobStatus;

class JobQueued extends BaseListener
{

    /**
     * @param \Illuminate\Queue\Events\JobQueued $event
     * @return void|bool
     */
    public function handle(\Illuminate\Queue\Events\JobQueued $event)
    {
        $job = $event->job;
        if($this->validateJob($job) === false) {
            return true;
        }

        $jobStatus = JobStatus::create([
            'job_class' => get_class($job),
            'job_alias' => $job->alias(),
            'percentage' => 0,
            'status' => 'queued',
            'uuid' => $event->id
        ]);

        foreach ($job->tags() as $key => $value) {
            $jobStatus->tags()->create([
                'key' => $key,
                'value' => $value,
            ]);
        }
    }

}
