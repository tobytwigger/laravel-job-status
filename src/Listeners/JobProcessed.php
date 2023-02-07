<?php

namespace JobStatus\Listeners;

use Illuminate\Bus\Batch;
use Illuminate\Bus\BatchRepository;
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
     */
    public function handle(\Illuminate\Queue\Events\JobProcessed $event)
    {
        if ($this->isTrackingEnabled()) {
            $modifier = $this->getJobStatusModifier($event->job);
            if ($modifier === null) {
                return;
            }

            if ($modifier->getJobStatus()->status === Status::STARTED) {
                $modifier->setFinishedAt(now());
                $modifier->setPercentage(100.0);

                if ($event->job->hasFailed()) {
                    $modifier->setStatus(Status::FAILED);
                } elseif ($this->batchIsCancelled($modifier->getJobStatus())) {
                    $modifier->setStatus(Status::CANCELLED);
                    $modifier->warningMessage('The batch that the job is a part of has been cancelled');
                } else {
                    $modifier->setStatus(Status::SUCCEEDED);
                }
            }

            if ($event->job->isReleased()) {
                $jobStatus = JobStatus::create([
                    'class' => $modifier->getJobStatus()?->class,
                    'alias' => $modifier->getJobStatus()?->alias,
                    'queue' => $modifier->getJobStatus()->queue,
                    'batch_id' => $modifier->getJobStatus()->batch_id,
                    'percentage' => 0,
                    'status' => Status::QUEUED,
                    'uuid' => $event->job->uuid(),
                    'connection_name' => $event->job->getConnectionName(),
                    'job_id' => $event->job->getJobId(),
                    'is_unprotected' => $modifier->getJobStatus()?->is_unprotected,
                ]);

                $newModifier = JobStatusModifier::forJobStatus($jobStatus)->setStatus(Status::QUEUED);

                foreach ($modifier->getJobStatus()->tags()->get() as $tag) {
                    $jobStatus->tags()->create([
                        'key' => $tag->key,
                        'value' => $tag->value,
                        'is_indexless' => $tag->is_indexless,
                    ]);
                }

                foreach ($modifier->getJobStatus()?->users()->get() as $user) {
                    $newModifier->grantAccessTo($user->user_id);
                }
            }

            $modifier->setPercentage(100);
        }
    }

    private function batchIsCancelled(?JobStatus $jobStatus): bool
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
