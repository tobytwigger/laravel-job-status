<?php

namespace JobStatus\Tests\Unit\Models;

use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobExceptionTest extends TestCase
{
    /** @test */
    public function a_model_can_be_created()
    {
        $this->markTestIncomplete('Below is copied from elsewhere');
        $attributes = [
            'message' => 'My message',
            'type' => \JobStatus\Enums\MessageType::INFO,
            'job_status_id' => JobStatus::factory()->create()->id,
        ];

        JobMessage::factory()->create($attributes);
        $this->assertDatabaseHas('job_status_job_messages', $attributes);
    }

    /** @test */
    public function it_has_a_relationship_with_job_status()
    {
        $this->markTestIncomplete('Below is copied from elsewhere');
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $message->jobStatus
            )
        );
    }

    /** @test */
    public function it_saves_timestamps_with_milliseconds(){
        $this->markTestIncomplete();
    }

    /** @test */
    public function it_has_a_relationship_with_itself_through_previous(){
        $this->markTestIncomplete();
    }

    /** @test */
    public function loadAllPrevious_returns_just_the_main_exception_if_previous_is_null(){
        $this->markTestIncomplete();
    }

    /** @test */
    public function loadAllPrevious_returns_one_parent_if_only_one_parent(){
        $this->markTestIncomplete();
    }

    /** @test */
    public function loadPrevious_returns_all_parents_loaded(){
        $this->markTestIncomplete();
    }
}
