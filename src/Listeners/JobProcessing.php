<?php

namespace JobStatus\Listeners;

use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;

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
