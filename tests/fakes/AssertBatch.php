<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobBatch;

class AssertBatch
{

    private JobBatch $jobBatch;

    public function __construct(JobBatch $jobBatch)
    {
        $this->jobBatch = $jobBatch;
    }

    public function hasName(string $name)
    {
        Assert::assertEquals($name, $this->jobBatch->name);

        return $this;
    }

    public function hasBatchId(string $batchId)
    {
        Assert::assertEquals($batchId, $this->jobBatch->batch_id);

        return $this;
    }

}
