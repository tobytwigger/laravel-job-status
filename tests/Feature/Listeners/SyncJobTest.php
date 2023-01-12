<?php

namespace JobStatus\Tests\Feature\Listeners;

use JobStatus\Tests\TestCase;

class SyncJobTest extends TestCase
{

    /** @test */
    public function it_handles_a_sync_job_properly(){
        // JobProcessing
        // JobProcessed
    }

    /** @test */
    public function it_handles_a_sync_job_failing(){
        // JobProcessing
        // JobExceptionOccured
    }

}
