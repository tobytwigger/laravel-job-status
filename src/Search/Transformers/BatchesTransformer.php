<?php

namespace JobStatus\Search\Transformers;

use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\BatchCollection;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Result\Batch;

class BatchesTransformer
{
    public function transform(JobStatusCollection $jobStatusCollection): BatchCollection
    {
        $batchIds = $jobStatusCollection->groupBy('batch_id')
            ->keys();

        $queryResult = JobStatus::query()
            ->select('batch_id')
            ->selectRaw('MAX(class) as class')
            ->selectRaw('MAX(created_at) as created_at')
            ->selectRaw('MAX(id) as id')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->whereIn('batch_id', $batchIds)
            ->with('batch')
            ->groupBy('batch_id')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $batchCollection = new BatchCollection();
        foreach ($queryResult as $jobResults) {
            // Improve this to not make any additional queries.
            $batchCollection->push(
                new Batch(
                    $jobResults->batch,
                    numberOfRuns: $jobResults->count,
                    countWithStatus: $this->loadCount($jobResults->batch_id)
                )
            );
        }

        return $batchCollection;
    }

    private function loadCount(int $batchId): array
    {
        return JobStatus::query()
            ->withoutEagerLoads()
            ->where('batch_id', $batchId)
            ->groupBy('status')
            ->select('status')
            ->selectRaw('COUNT(DISTINCT selector) as count')
            ->get()
            ->mapWithKeys(fn ($result) => [$result->status->value => $result->count])
            ->toArray();
    }
}
