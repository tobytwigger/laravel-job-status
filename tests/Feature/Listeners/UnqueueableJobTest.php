<?php

namespace JobStatus\Tests\Feature\Listeners;

use JobStatus\Tests\TestCase;

class UnqueueableJobTest extends TestCase
{


    /** @test */
    public function it_handles_a_queued_job_properly(){
        // JobQueued
        // JobProcessing
        // JobProcessed
    }

    /** @test */
    public function it_handles_a_queued_job_failing(){
        // JobQueued
        // JobProcessing
        // JobExceptionOccured
        // JobReleasedAfterException
    }

    /** @test */
    public function it_handles_a_queued_job_failing_for_the_last_time(){
        // JobQueued
        // JobProcessing
        // JobFailed
        // JobExceptionOccured
    }

    /** @test */
    public function it_handles_a_queued_job_failing_too_many_times_but_queued_for_retry(){
        // JobQueued
        // JobProcessing
        // JobFailed
        // JobExceptionOccured
        // JobReleasedAfterException
    }

    /** @test */
    public function it_handles_a_queued_job_failing_before_running(){
        // JobQueued
        // JobProcessing
        // JobFailed
        // JobProcessed
    }



}
