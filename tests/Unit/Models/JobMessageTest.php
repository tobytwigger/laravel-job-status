<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobMessageTest extends TestCase
{
    /** @test */
    public function a_model_can_be_created()
    {
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
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $message->jobStatus
            )
        );
    }

    /** @test */
    public function it_saves_timestamps_with_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobMessage::factory()->create();

        $createdAt = $exception->created_at;
        $this->assertEquals(1, $createdAt->day);
        $this->assertEquals(3, $createdAt->month);
        $this->assertEquals(2020, $createdAt->year);
        $this->assertEquals(11, $createdAt->hour);
        $this->assertEquals(30, $createdAt->minute);
        $this->assertEquals(24, $createdAt->second);
        $this->assertEquals(234, $createdAt->millisecond);

        $updatedAt = $exception->updated_at;
        $this->assertEquals(1, $updatedAt->day);
        $this->assertEquals(3, $updatedAt->month);
        $this->assertEquals(2020, $updatedAt->year);
        $this->assertEquals(11, $updatedAt->hour);
        $this->assertEquals(30, $updatedAt->minute);
        $this->assertEquals(24, $updatedAt->second);
        $this->assertEquals(234, $updatedAt->millisecond);
    }
}
