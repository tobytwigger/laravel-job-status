<?php

namespace JobStatus\Tests\Unit\Models;

use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobMessageTest extends TestCase
{

    /** @test */
    public function a_model_can_be_created(){
        $attributes = [
            'message' => 'My message',
            'type' => 'info',
            'job_status_id' => JobStatus::factory()->create()->id
        ];

        JobMessage::factory()->create($attributes);
        $this->assertDatabaseHas('job_status_job_messages', $attributes);
    }

}
