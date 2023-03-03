<?php

namespace JobStatus\Listeners;

use Illuminate\Bus\Batch;
use Illuminate\Bus\BatchRepository;
use JobStatus\Enums\Status;
use JobStatus\Listeners\Utils\Helper;

/**
 * Fired when a job is processing. This happens when the queue worker picks up the job.
 *
 * - Mark the job as started.
 */
class JobProcessing
{
    /**
     * @param \Illuminate\Queue\Events\JobProcessing $event
     */
    public function handle(\Illuminate\Queue\Events\JobProcessing $event)
    {
        $helper = Helper::forJob($event->job);

        if (Helper::isTrackingEnabled()) {
            $modifier = $helper->getJobStatusModifier();

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
