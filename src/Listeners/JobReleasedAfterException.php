<?php

namespace JobStatus\Listeners;

use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Listeners\Utils\Helper;
use JobStatus\Models\JobStatus;

/**
 * When a job has finished processing but is going to be released to try again.
 *
 * - Create a new job status.
 */
class JobReleasedAfterException
{
    /**
     * @param \Illuminate\Queue\Events\JobReleasedAfterException $event
     */
    public function handle(\Illuminate\Queue\Events\JobReleasedAfterException $event)
    {
        $helper = Helper::forJob($event->job);

        if (Helper::isTrackingEnabled()) {
            $modifier = $helper->getJobStatusModifier();
            if ($modifier === null) {
                return;
            }

            $jobStatus = JobStatus::create([
                'queue' => $modifier->getJobStatus()->queue,
                'class' => $modifier->getJobStatus()?->class,
                'alias' => $modifier->getJobStatus()?->alias,
                'percentage' => 0,
                'batch_id' => $modifier->getJobStatus()->batch_id,
                'status' => Status::QUEUED,
                'uuid' => $helper->getJob()->uuid(),
                'connection_name' => $helper->getJob()->getConnectionName(),
                'job_id' => $helper->getJob()->getJobId(),
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
    }
}
