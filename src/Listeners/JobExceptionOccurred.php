<?php

namespace JobStatus\Listeners;

use JobStatus\Enums\Status;
use JobStatus\Exception\JobCancelledException;

/**
 * Occurs when an exception occurs in the job execution.
 *
 * Sometimes this will happen after job failed, but job failed is not fired if there are more attempts left. Therefore
 * we are looking for job statuses which are running or finished (since they may have come through the job exception.
 */
class JobExceptionOccurred extends BaseListener
{

    public function handle(\Illuminate\Queue\Events\JobExceptionOccurred $event)
    {
        if($this->isTrackingEnabled()) {
// If the job is a cancelled job, we want to make sure the job doesn't run again. For this, we need to actually fail the job!
            if ($event->exception instanceof JobCancelledException) {
                $event->job->fail($event->exception);
            }

            $modifier = $this->getJobStatusModifier($event->job);
            if ($modifier === null) {
                return true;
            }

            // This is only the case if JobFailed has not ran, so we need to update the status since Jobfailed hasn't done it.
            if ($modifier->getJobStatus()->status !== Status::FAILED && $modifier->getJobStatus()->status !== Status::CANCELLED) {
                if ($event->exception instanceof JobCancelledException) {
                    $modifier->setStatus(Status::CANCELLED);
                    $modifier->warningMessage('The job has been cancelled');
                } else {
                    $modifier->setStatus(Status::FAILED);
                    $modifier->addException($event->exception);
                }
            }

            $modifier->setPercentage(100);
        }
    }

}
