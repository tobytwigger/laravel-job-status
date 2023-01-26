<?php

namespace JobStatus\Listeners;

use Composer\XdebugHandler\Process;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;

/**
 * When the job has finished.
 *
 * This could happen by itself if the job is successful, in which case mark the job as succeeded. It could be after an exception (job failed),
 * which could be a cancellation, so we need to respect the status of the job status unless it's running, in which case set it to sucessful.
 *
 * - Job status to successful if it's running.
 * - Set percentage to 100%.
 */
class JobProcessed extends BaseListener
{

    /**
     * @param \Illuminate\Queue\Events\JobProcessed $event
     * @return void
     */
    public function handle(\Illuminate\Queue\Events\JobProcessed $event)
    {
        if($this->isTrackingEnabled()) {


            $modifier = $this->getJobStatusModifier($event->job);
            if ($modifier === null) {
                return;
            }

            if ($modifier->getJobStatus()->isRunning()) {
                $modifier->setFinishedAt(now());
                if ($event->job->hasFailed()) {
                    $modifier->setStatus(Status::FAILED);
                } else {
                    $modifier->setStatus(Status::SUCCEEDED);
                }
            }

            if ($event->job->isReleased()) {
                $jobStatus = JobStatus::create([
                    'job_class' => $modifier->getJobStatus()?->job_class,
                    'job_alias' => $modifier->getJobStatus()?->job_alias,
                    'percentage' => 0,
                    'status' => Status::QUEUED,
                    'uuid' => $event->job->uuid(),
                    'connection_name' => $event->job->getConnectionName(),
                    'job_id' => $event->job->getJobId()
                ]);

                JobStatusModifier::forJobStatus($jobStatus)->setStatus(Status::QUEUED);

                foreach ($modifier->getJobStatus()->tags()->get() as $tag) {
                    $jobStatus->tags()->create([
                        'key' => $tag->key,
                        'value' => $tag->value,
                    ]);
                }
            }

            $modifier->setPercentage(100);

        }
    }

}
