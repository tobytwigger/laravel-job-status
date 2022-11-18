<?php

namespace JobStatus\Listeners;

use Illuminate\Queue\ManuallyFailedException;
use JobStatus\Exception\JobCancelledException;

class JobFailed extends BaseListener
{

    public function handle(\Illuminate\Queue\Events\JobFailed $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }

        $event->exception instanceof JobCancelledException ? $modifier->setStatus('cancelled') : $modifier->setStatus('failed');
        $modifier->setPercentage(100);
        $event->exception instanceof JobCancelledException ? $modifier->warningMessage('The job has been cancelled') : $modifier->errorMessage(get_class($event->exception) . '  ' . $event->exception->getMessage());
    }

}
