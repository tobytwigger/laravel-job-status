<?php

namespace JobStatus\Search\Transformers;

use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Collections\QueueCollection;
use JobStatus\Search\Result\Queue;

class QueuesTransformer
{
    public function transform(JobStatusCollection $jobStatusCollection): QueueCollection
    {
        $queues = $jobStatusCollection->groupBy('queue')
            ->keys();

        $queryResult = JobStatus::query()
            ->select('queue')
            ->selectRaw('MAX(class) as class')
            ->selectRaw('MAX(created_at) as created_at')
            ->selectRaw('MAX(id) as id')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->whereIn('queue', $queues)
            ->groupBy('queue')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $queueCollection = new QueueCollection();
        foreach ($queryResult as $jobResults) {
            // Improve this to not make any additional queries.
            $queueCollection->push(
                new Queue(
                    $jobResults->queue,
                    numberOfRuns: $jobResults->count,
                    countWithStatus: $this->loadCount($jobResults->queue)
                )
            );
        }

        return $queueCollection;
    }

    private function loadCount(string $queue): array
    {
        return JobStatus::query()
            ->withoutEagerLoads()
            ->where('queue', $queue)
            ->groupBy('status')
            ->select('status')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->get()
            ->mapWithKeys(fn ($result) => [$result->status->value => $result->count])
            ->toArray();
    }
}
