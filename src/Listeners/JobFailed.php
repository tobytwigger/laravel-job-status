<?php

namespace JobStatus\Listeners;

use Illuminate\Queue\ManuallyFailedException;
use JobStatus\Exception\JobCancelledException;

/**
 * Thrown when a job has failed and will no longer be ran.
 *
 * We can get to this point through either a job processing before realising max attempts is exceeded, or max attempts
 * being exceeded after an exception was thrown during the running of the job. For both of these, the job will have come from
 * a point of running, so we get the job that's running.
 *
 * - Mark the job as failed.
 * - Save an error message
 * - If the exception is a cancelled exception, mark it as cancelled instead
 * - Set the percentage to 100%
 *
 */
class JobFailed extends BaseListener
{

    public function handle(\Illuminate\Queue\Events\JobFailed $event)
    {
        $modifier = $this->getJobStatusModifier($event->job);
        if($modifier === null) {
            return true;
        }

        $modifier->setPercentage(100);

        if($event->exception instanceof JobCancelledException) {
            $modifier->setStatus('cancelled');
            $modifier->warningMessage('The job has been cancelled');
        } else {
            $modifier->setStatus('failed');
            $modifier->errorMessage(get_class($event->exception) . ': ' . $event->exception->getMessage());
        }

    }

}
