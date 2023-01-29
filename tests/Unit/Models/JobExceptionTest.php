<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobExceptionTest extends TestCase
{
    /** @test */
    public function a_model_can_be_created()
    {
        JobException::factory()->create([
            'message' => 'This was my error',
            'stack_trace' => [
                'Stack 1',
                'Stack 2',
            ],
            'previous_id' => null,
            'line' => 44,
            'file' => 'xxx.php',
            'code' => 'getStatus',
        ]);

        $this->assertDatabaseHas('job_status_job_exceptions', [
            'message' => 'This was my error',
            'stack_trace' => json_encode([
                'Stack 1',
                'Stack 2',
            ]),
            'previous_id' => null,
            'line' => 44,
            'file' => 'xxx.php',
            'code' => 'getStatus',
        ]);
    }

    /** @test */
    public function it_has_a_relationship_with_job_status()
    {
        $exception = JobException::factory()->create();
        $jobStatus = JobStatus::factory()->create(['exception_id' => $exception->id]);

        $this->assertTrue(
            $jobStatus->is(
                $exception->jobStatus
            )
        );
    }

    /** @test */
    public function it_saves_timestamps_with_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobException::factory()->create();

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
    public function it_has_a_relationship_with_itself_through_previous()
    {
        $previous1 = JobException::factory()->create();
        $previous2 = JobException::factory()->create(['previous_id' => $previous1->id]);
        $exception = JobException::factory()->create(['previous_id' => $previous2->id]);

        $this->assertInstanceOf(JobException::class, $exception->previous);
        $this->assertTrue($exception->previous->exists());
        $this->assertTrue($exception->previous->is($previous2));

        $this->assertInstanceOf(JobException::class, $exception->previous->previous);
        $this->assertTrue($exception->previous->previous->exists());
        $this->assertTrue($exception->previous->previous->is($previous1));
    }

    /** @test */
    public function load_all_previous_returns_just_the_main_exception_if_previous_is_null()
    {
        $exception = JobException::factory()->create(['previous_id' => null]);

        $exception = $exception->loadAllPrevious();
        $this->assertInstanceOf(JobException::class, $exception);
        $array = $exception->toArray();
        $this->assertEquals($exception->id, $array['id']);

        $this->assertArrayHasKey('previous', $array);
        $this->assertNull($array['previous']);
    }

    /** @test */
    public function load_all_previous_returns_one_parent_if_only_one_parent()
    {
        $previous1 = JobException::factory()->create();
        $exception = JobException::factory()->create(['previous_id' => $previous1->id]);

        $exception = $exception->loadAllPrevious();
        $this->assertInstanceOf(JobException::class, $exception);
        $array = $exception->toArray();
        $this->assertEquals($exception->id, $array['id']);

        $this->assertArrayHasKey('previous', $array);
        $this->assertIsArray($array['previous']);
        $this->assertEquals($previous1->id, $array['previous']['id']);

        $this->assertArrayHasKey('previous', $array['previous']);
        $this->assertNull($array['previous']['previous']);
    }

    /** @test */
    public function load_all_previous_returns_all_parents_loaded()
    {
        $previous1 = JobException::factory()->create();
        $previous2 = JobException::factory()->create(['previous_id' => $previous1->id]);
        $previous3 = JobException::factory()->create(['previous_id' => $previous2->id]);
        $exception = JobException::factory()->create(['previous_id' => $previous3->id]);

        $exception = $exception->loadAllPrevious();
        $this->assertInstanceOf(JobException::class, $exception);
        $array = $exception->toArray();
        $this->assertEquals($exception->id, $array['id']);

        $this->assertArrayHasKey('previous', $array);
        $this->assertIsArray($array['previous']);
        $this->assertEquals($previous3->id, $array['previous']['id']);

        $this->assertArrayHasKey('previous', $array['previous']);
        $this->assertIsArray($array['previous']['previous']);
        $this->assertEquals($previous2->id, $array['previous']['previous']['id']);


        $this->assertArrayHasKey('previous', $array['previous']['previous']);
        $this->assertIsArray($array['previous']['previous']['previous']);
        $this->assertEquals($previous1->id, $array['previous']['previous']['previous']['id']);

        $this->assertArrayHasKey('previous', $array['previous']['previous']['previous']);
        $this->assertNull($array['previous']['previous']['previous']['previous']);
    }
}
