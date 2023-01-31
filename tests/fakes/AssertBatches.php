<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobBatch;

class AssertBatches
{
    public function hasCountInDatabase(int $count): AssertBatches
    {
        Assert::assertCount($count, JobBatch::all());

        return $this;
    }

    public function withIndex(int $index, \Closure $callback): AssertBatches
    {
        $batch = JobBatch::all()[$index];

        $callback(new AssertBatch($batch));

        return $this;
    }
}
