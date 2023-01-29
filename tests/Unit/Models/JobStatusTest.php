<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class JobStatusTest extends TestCase
{
    /** @test */
    public function it_creates_a_model()
    {
        $attributes = [
            'job_class' => 'MyJobClass',
            'job_alias' => 'my-job-alias',
            'percentage' => 55.3,
        ];

        JobStatus::factory()->create($attributes);

        $this->assertDatabaseHas('job_status_job_statuses', $attributes);
    }

    /** @test */
    public function it_has_many_messages()
    {
        $status = JobStatus::factory()->create();
        $messages = JobMessage::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobMessage::factory()->count(10)->create();

        $this->assertEquals(5, $status->messages()->count());
        $retrieved = $status->messages()->orderBy('id')->get();
        foreach ($messages as $message) {
            $this->assertTrue($message->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_signals()
    {
        $status = JobStatus::factory()->create();
        $signals = JobSignal::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobSignal::factory()->count(10)->create();

        $this->assertEquals(5, $status->signals()->count());
        $retrieved = $status->signals;
        foreach ($signals as $signal) {
            $this->assertTrue($signal->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_tags()
    {
        $status = JobStatus::factory()->create();
        $tags = JobStatusTag::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->count(10)->create();

        $this->assertEquals(5, $status->tags()->count());
        $retrieved = $status->tags;
        foreach ($tags as $tag) {
            $this->assertTrue($tag->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_statuses()
    {
        $status = JobStatus::factory()->create();
        $statuses = JobStatusStatus::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobStatusStatus::factory()->count(10)->create();

        $this->assertEquals(5, $status->statuses()->count());
        $retrieved = $status->statuses;
        foreach ($statuses as $status) {
            $this->assertTrue($status->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_an_exception()
    {
        $exception = JobException::factory()->create();
        $status = JobStatus::factory()->create(['exception_id' => $exception->id]);
        JobException::factory()->count(10)->create();

        $this->assertTrue($status->exception->is($exception));
    }

    /** @test */
    public function it_saves_the_timestamps_with_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobStatus::factory()->create([
            'started_at' => $now,
            'finished_at' => $now,
        ]);

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

        $startedAt = $exception->started_at;
        $this->assertEquals(1, $startedAt->day);
        $this->assertEquals(3, $startedAt->month);
        $this->assertEquals(2020, $startedAt->year);
        $this->assertEquals(11, $startedAt->hour);
        $this->assertEquals(30, $startedAt->minute);
        $this->assertEquals(24, $startedAt->second);
        $this->assertEquals(234, $startedAt->millisecond);

        $finishedAt = $exception->finished_at;
        $this->assertEquals(1, $finishedAt->day);
        $this->assertEquals(3, $finishedAt->month);
        $this->assertEquals(2020, $finishedAt->year);
        $this->assertEquals(11, $finishedAt->hour);
        $this->assertEquals(30, $finishedAt->minute);
        $this->assertEquals(24, $finishedAt->second);
        $this->assertEquals(234, $finishedAt->millisecond);
    }
}
