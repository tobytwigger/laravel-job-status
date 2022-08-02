<?php

namespace JobStatus\Tests\Unit;

use JobStatus\JobStatusCollection;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobStatusCollectionTest extends TestCase
{

    protected JobStatusCollection $finishedJobs;

    protected function setUp(): void
    {
        parent::setUp();
        $this->finishedJobs = new JobStatusCollection([
            ...JobStatus::factory()->count(5)->create(['status' => 'failed']),
            ...JobStatus::factory()->count(10)->create(['status' => 'queued']),
            ...JobStatus::factory()->count(15)->create(['status' => 'started']),
            ...JobStatus::factory()->count(20)->create(['status' => 'cancelled']),
            ...JobStatus::factory()->count(25)->create(['status' => 'succeeded']),
        ]);
    }

    /** @test */
    public function it_counts_the_finished_jobs(){
        $this->assertEquals(5+20+25, $this->finishedJobs->countFinished());
    }

    /** @test */
    public function it_counts_the_unfinished_jobs(){
        $this->assertEquals(10+15, $this->finishedJobs->countNotFinished());
    }

    /** @test */
    public function it_counts_the_successful_jobs(){
        $this->assertEquals(25, $this->finishedJobs->countSuccessful());
    }

    /** @test */
    public function it_counts_the_running_jobs(){
        $this->assertEquals(15, $this->finishedJobs->countRunning());
    }

}
