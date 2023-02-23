<?php

namespace JobStatus\Search\Collections;

use Illuminate\Database\Eloquent\Collection;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\Batch;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Queue;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Search\Transformers\BatchesTransformer;
use JobStatus\Search\Transformers\JobsTransformer;
use JobStatus\Search\Transformers\QueuesTransformer;
use JobStatus\Search\Transformers\RunsTransformer;

class JobStatusCollection extends Collection
{

    public function runs(): JobRunCollection
    {
        return (new RunsTransformer())->transform($this);
    }

    public function jobs(): TrackedJobCollection
    {
        return (new JobsTransformer())->transform($this);
    }

    public function queues(): QueueCollection
    {
        return (new QueuesTransformer())->transform($this);
    }

    public function batches(): BatchCollection
    {
        return (new BatchesTransformer())->transform($this);
    }
}
