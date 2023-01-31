<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobStatus;

class AssertJobStatuses
{
    public function hasCountInDatabase(int $count): AssertJobStatuses
    {
        Assert::assertCount($count, JobStatus::all());

        return $this;
    }

    public function withIndex(int $index, \Closure $callback): AssertJobStatuses
    {
        $jobStatus = JobStatus::all()[$index];

        $callback(new AssertJobStatus($jobStatus), JobStatus::all());

        return $this;
    }
}
