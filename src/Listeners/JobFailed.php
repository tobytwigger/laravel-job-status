<?php

namespace JobStatus\Listeners;

use Illuminate\Bus\Batch;
use Illuminate\Bus\BatchRepository;
use JobStatus\Enums\Status;
use JobStatus\Exceptions\JobCancelledException;
use JobStatus\Listeners\Utils\Helper;

/**
 * Thrown when a job has failed and will no longer be ran.
 *
 * We can get to this point through either a job processing before realising max attempts is exceeded, or max attempts
 * being exceeded after an exception was thrown during the running of the job. For both of these, the job will have come from
 * a point of running, so we get the job that's running.
 *
 * - Mark the job as failed.
 * - If the exception is a cancelled exception, mark it as cancelled instead
 * - Set the percentage to 100%
 *
 */
class JobFailed
{
    public function handle(\Illuminate\Queue\Events\JobFailed $event)
    {
        $helper = Helper::forJob($event->job);

        if (Helper::isTrackingEnabled()) {
            $modifier = $helper->getJobStatusModifier();
            if ($modifier === null) {
                return true;
            }

            $modifier->setPercentage(100);

            // This is only the case if JobExceptionOccurred has not been ran
            if ($modifier->getJobStatus()->status !== Status::FAILED && $modifier->getJobStatus()->status !== Status::CANCELLED) {
                $modifier->setFinishedAt(now());

                if ($event->exception instanceof JobCancelledException) {
                    $modifier->setStatus(Status::CANCELLED);
                } else {
                    $modifier->setStatus(Status::FAILED);
                    $modifier->addException($event->exception);
                }
            }
        }
    }

    private function batchIsCancelled(?\JobStatus\Models\JobStatus $jobStatus): bool
    {
        if ($jobStatus === null) {
            return false;
        }
        $batchId = $jobStatus->batch?->batch_id;
        if ($batchId !== null) {
            /** @var Batch|null $batch */
            $batch = app(BatchRepository::class)->find($batchId);

            return $batch?->cancelled() ?? false;
        }

        return false;
    }
}
