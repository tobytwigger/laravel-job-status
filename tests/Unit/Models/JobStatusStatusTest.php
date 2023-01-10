<?php

namespace JobStatus\Tests\Unit\Models;

use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Tests\TestCase;

class JobStatusStatusTest extends TestCase
{
    /** @test */
    public function it_can_be_created()
    {
        $jobStatus = JobStatus::factory()->create();

        $attributes = [
            'status' => 'succeeded',
            'job_status_id' => $jobStatus->id,
        ];

        JobStatusStatus::factory()->create($attributes);
        $this->assertDatabaseHas('job_status_job_status_statuses', $attributes);
    }

    /** @test */
    public function it_has_a_relationship_with_job_status()
    {
        $jobStatus = JobStatus::factory()->create();
        $status = JobStatusStatus::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $status->jobStatus
            )
        );
    }
}
