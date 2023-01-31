<?php

namespace JobStatus\Listeners;

use Illuminate\Bus\Batch;
use Illuminate\Bus\BatchRepository;
use JobStatus\Enums\Status;

/**
 * Fired when a job is processing. This happens when the queue worker picks up the job.
 *
 * - Mark the job as started.
 */
class JobProcessing extends BaseListener
{
    /**
     * @param \Illuminate\Queue\Events\JobProcessing $event
     */
    public function handle(\Illuminate\Queue\Events\JobProcessing $event)
    {
        if ($this->isTrackingEnabled()) {
            $modifier = $this->getJobStatusModifier($event->job);

            if ($modifier !== null) {
                $modifier->setStatus(Status::STARTED);
                $modifier->setStartedAt(now());

                $batchId = $modifier->getJobStatus()?->batch?->batch_id;
                if ($batchId !== null) {
                    /** @var Batch|null $batch */
                    $batch = app(BatchRepository::class)->find($batchId);
                    if ($batch?->cancelled()) {
                        if ($modifier !== null) {
                            $modifier->setFinishedAt(now());
                            $modifier->setPercentage(100.0);
                            $modifier->setStatus(Status::CANCELLED);
                            $modifier->warningMessage('The batch that the job is a part of has been cancelled');
                        }
                    }
                }
            }
        }
    }
}
