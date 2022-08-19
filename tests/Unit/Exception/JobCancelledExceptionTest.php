<?php

namespace JobStatus\Tests\Unit\Exception;

use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobSignal;
use JobStatus\Tests\TestCase;

class JobCancelledExceptionTest extends TestCase
{
    /** @test */
    public function it_creates_an_exception_for_a_job_status()
    {
        $signal = JobSignal::factory()->create(['signal' => 'my-test-signal']);
        $exception = JobCancelledException::for($signal);
        $this->assertEquals('Job stopped with signal my-test-signal', $exception->getMessage());
    }
}
