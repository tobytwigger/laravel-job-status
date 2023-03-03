<?php

namespace JobStatus\Listeners;

use Illuminate\Queue\Jobs\Job;
use JobStatus\Enums\Status;
use JobStatus\Exceptions\JobCancelledException;
use JobStatus\JobStatusModifier;
use JobStatus\Listeners\Utils\Helper;
use JobStatus\Models\JobStatus;

/**
 * Occurs when an exception occurs in the job execution.
 *
 * Sometimes this will happen after job failed, but job failed is not fired if there are more attempts left. Therefore
 * we are looking for job statuses which are running or finished (since they may have come through the job exception.
 */
class JobExceptionOccurred
{
    public function handle(\Illuminate\Queue\Events\JobExceptionOccurred $event)
    {
        $helper = Helper::forJob($event->job);

        if (Helper::isTrackingEnabled()) {
            // If the job is a cancelled job, we want to make sure the job doesn't run again. For this, we need to actually fail the job!
            if ($event->exception instanceof JobCancelledException) {
                $helper->getJob()->fail($event->exception);
            }
            $modifier = $helper->getJobStatusModifier();
            if ($modifier === null) {
                return true;
            }

            // This is only the case if JobFailed has not ran, so we need to update the status since Jobfailed hasn't done it.
            if ($modifier->getJobStatus()->status !== Status::FAILED && $modifier->getJobStatus()->status !== Status::CANCELLED) {
                $modifier->setFinishedAt(now());
                if ($event->exception instanceof JobCancelledException) {
                    $modifier->setStatus(Status::CANCELLED);
                } else {
                    $modifier->setStatus(Status::FAILED);
                    $modifier->addException($event->exception);
                }
            }

            // Happens if the job has been released already during the job, and therefore won't be once job failed
            if ($helper->getJob()->isReleased()) {
                $jobStatus = JobStatus::create([
                    'queue' => $modifier->getJobStatus()->queue,
                    'class' => $modifier->getJobStatus()?->class,
                    'alias' => $modifier->getJobStatus()?->alias,
                    'percentage' => 0,
                    'batch_id' => $modifier->getJobStatus()->batch_id,
                    'status' => Status::QUEUED,
                    'uuid' => $helper->getJob()->uuid(),
                    'connection_name' => $helper->getJob()->getConnectionName(),
                    'is_unprotected' => $modifier->getJobStatus()?->is_unprotected,
                ]);


                JobStatusModifier::forJobStatus($jobStatus)->setStatus(Status::QUEUED);

                foreach ($modifier->getJobStatus()->tags()->get() as $tag) {
                    $jobStatus->tags()->create([
                        'key' => $tag->key,
                        'value' => $tag->value,
                        'is_indexless' => $tag->is_indexless,
                    ]);
                }

                foreach ($modifier->getJobStatus()->users()->get() as $user) {
                    $jobStatus->users()->create([
                        'user_id' => $user->user_id,
                    ]);
                }
            }

            $modifier->setPercentage(100);
        }
    }
}
