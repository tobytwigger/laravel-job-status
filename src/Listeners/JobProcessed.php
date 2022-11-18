<?php

namespace JobStatus\Listeners;

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

        $modifier->setPercentage(100);
        if($modifier->getJobStatus()?->status !== 'cancelled') {
            $modifier?->setStatus($event->job->hasFailed() ? 'failed' : 'succeeded');
        }
    }

}
