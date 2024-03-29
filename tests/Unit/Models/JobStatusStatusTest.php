<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Enums\Status;
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
            'status' => \JobStatus\Enums\Status::SUCCEEDED,
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

    /** @test */
    public function it_saves_timestamps_with_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobStatusStatus::factory()->create();

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

    /** @test */
    public function it_does_not_get_created_when_disabled()
    {
        config()->set('laravel-job-status.collectors.status_history.enabled', false);
        $status = JobStatusStatus::factory()->create();

        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_statuses');
    }

    /** @test */
    public function a_job_message_can_be_updated_when_disabled()
    {
        config()->set('laravel-job-status.collectors.status_history.enabled', true);
        $status = JobStatusStatus::factory()->create(['status' => Status::QUEUED]);

        config()->set('laravel-job-status.collectors.status_history.enabled', false);

        $this->assertDatabaseHas(config('laravel-job-status.table_prefix') . '_job_status_statuses', [
            'status' => Status::QUEUED->value,
        ]);

        $status->status = Status::STARTED;
        $status->save();

        $this->assertDatabaseHas(config('laravel-job-status.table_prefix') . '_job_status_statuses', [
            'status' => Status::STARTED->value,
        ]);

        JobStatusStatus::factory()->create(['status' => Status::FAILED]);

        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_status_statuses', 1);
        $this->assertDatabaseMissing(config('laravel-job-status.table_prefix') . '_job_status_statuses', [
            'status' => Status::FAILED->value,
        ]);
    }
}
