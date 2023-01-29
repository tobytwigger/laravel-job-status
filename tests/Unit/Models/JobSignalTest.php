<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobSignalTest extends TestCase
{
    /** @test */
    public function it_can_be_created()
    {
        $jobStatus = JobStatus::factory()->create();
        $now = Carbon::now();
        $signal = JobSignal::factory()->create([
            'job_status_id' => $jobStatus->id,
            'signal' => 'my-signal',
            'handled_at' => $now,
            'parameters' => ['one' => 'param'],
            'cancel_job' => false,
        ]);
        $this->assertDatabaseHas('job_status_job_signals', [
            'job_status_id' => $jobStatus->id,
            'signal' => 'my-signal',
            'handled_at' => $now->format('Y-m-d H:i:s.v'),
            'parameters' => json_encode(['one' => 'param']),
            'cancel_job' => 0,
        ]);
    }

    /** @test */
    public function unhandled_scopes_to_only_unhandled_signals()
    {
        $handled = JobSignal::factory()->count(5)->create(['handled_at' => Carbon::now()]);
        $notHandled = JobSignal::factory()->count(4)->create(['handled_at' => null]);

        $this->assertEquals(4, JobSignal::unhandled()->count());
        $retrieved = JobSignal::unhandled()->get();
        foreach ($notHandled as $jobSignal) {
            $this->assertTrue($jobSignal->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_a_relationship_with_job_status()
    {
        $jobStatus = JobStatus::factory()->create();
        $signal = JobSignal::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $signal->jobStatus
            )
        );
    }

    /** @test */
    public function it_saves_timestamps_in_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobSignal::factory()->create(['handled_at' => $now]);

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

        $handledAt = $exception->handled_at;
        $this->assertEquals(1, $handledAt->day);
        $this->assertEquals(3, $handledAt->month);
        $this->assertEquals(2020, $handledAt->year);
        $this->assertEquals(11, $handledAt->hour);
        $this->assertEquals(30, $handledAt->minute);
        $this->assertEquals(24, $handledAt->second);
        $this->assertEquals(234, $handledAt->millisecond);
    }
}
