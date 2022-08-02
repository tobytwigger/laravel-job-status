<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobSignalTest extends TestCase
{

    /** @test */
    public function it_can_be_created(){
        $jobStatus = JobStatus::factory()->create();

        $signal = JobSignal::factory()->create([
            'job_status_id' => $jobStatus->id,
            'signal' => 'my-signal',
            'handled_at' => Carbon::now(),
            'parameters' => ['one' => 'param'],
            'cancel_job' => false,
        ]);
        $this->assertDatabaseHas('job_status_job_signals', [
            'job_status_id' => $jobStatus->id,
            'signal' => 'my-signal',
            'handled_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'parameters' => json_encode(['one' => 'param']),
            'cancel_job' => 0,
        ]);
    }

    /** @test */
    public function unhandled_scopes_to_only_unhandled_signals(){
        $handled = JobSignal::factory()->count(5)->create(['handled_at' => Carbon::now()]);
        $notHandled = JobSignal::factory()->count(4)->create(['handled_at' => null]);

        $this->assertEquals(4, JobSignal::unhandled()->count());
        $retrieved = JobSignal::unhandled()->get();
        foreach($notHandled as $jobSignal) {
            $this->assertTrue($jobSignal->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_a_relationship_with_job_status(){
        $jobStatus = JobStatus::factory()->create();
        $signal = JobSignal::factory()->create(['job_status_id' => $jobStatus->id]);

        $this->assertTrue(
            $jobStatus->is(
                $signal->jobStatus
            )
        );
    }

}
