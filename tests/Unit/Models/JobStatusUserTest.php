<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class JobStatusUserTest extends TestCase
{
    /** @test */
    public function a_model_can_be_created()
    {
        $attributes = [
            'user_id' => 1,
            'job_status_id' => JobStatus::factory()->create()->id,
        ];

        JobStatusUser::factory()->create($attributes);
        $this->assertDatabaseHas('job_status_job_status_users', $attributes);
    }

    /** @test */
    public function it_has_a_relationship_with_job_status()
    {
        $jobStatus = JobStatus::factory()->create();
        $user = JobStatusUser::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $user->jobStatus
            )
        );
    }

}
