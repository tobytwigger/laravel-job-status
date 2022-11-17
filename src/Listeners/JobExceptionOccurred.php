<?php

namespace JobStatus\Listeners;

use JobStatus\Exception\JobCancelledException;

class JobExceptionOccurred extends BaseListener
{

    public function handle(\Illuminate\Queue\Events\JobExceptionOccurred $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }
        $event->exception instanceof JobCancelledException ? $modifier->setStatus('cancelled') : $modifier->setStatus('failed');
        $event->exception instanceof JobCancelledException ? $modifier->warningMessage('The job has been cancelled') : $modifier->errorMessage(get_class($event->exception) . '  ' . $event->exception->getMessage());

        if($event->exception instanceof JobCancelledException) {
            $event->job->fail($event->exception);
        }
    }

}
