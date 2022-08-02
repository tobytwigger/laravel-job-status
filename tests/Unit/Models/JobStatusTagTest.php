<?php

namespace JobStatus\Tests\Unit\Models;

use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class JobStatusTagTest extends TestCase
{

    /** @test */
    public function a_model_can_be_created(){
        $attributes = [
            'key' => 'my-key',
            'value' => 'my-value',
            'job_status_id' => JobStatus::factory()->create()->id
        ];

        JobStatusTag::factory()->create($attributes);
        $this->assertDatabaseHas('job_status_job_status_tags', $attributes);
    }

    /** @test */
    public function it_has_a_relationship_with_job_status(){
        $jobStatus = JobStatus::factory()->create();
        $tag = JobStatusTag::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $tag->jobStatus
            )
        );
    }

}
