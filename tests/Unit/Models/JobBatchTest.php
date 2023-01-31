<?php

namespace JobStatus\Tests\Unit\Models;

use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobBatchTest extends TestCase
{
    /** @test */
    public function it_creates_a_model()
    {
        $attributes = [
            'batch_id' => 'ABC123',
            'name' => 'My Batch',
        ];

        JobBatch::factory()->create($attributes);

        $this->assertDatabaseHas('job_status_job_batches', $attributes);
    }

    /** @test */
    public function it_links_to_job_statuses()
    {
        $batch = JobBatch::factory()->create();

        $jobStatuses = JobStatus::factory()->count(3)->create(['batch_id' => $batch->id]);

        $results = $batch->jobStatus;
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $jobStatuses->pluck('id')->sort()->values());
    }

    /** @test */
    public function job_statuses_is_an_empty_array_if_no_linked_job_statuses()
    {
        $batch = JobBatch::factory()->create();

        $results = $batch->jobStatus;
        $this->assertCount(0, $results);
    }
}
