<?php

namespace JobStatus\Tests\Feature\Listeners;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class WithoutTrackingTest extends TestCase
{

    /** @test */
    public function it_throws_an_error_when_called_directly(){
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Could not get the status of the job');

        $job = new JobFake(callback: function(JobFake $jobFake) {
            $jobFake->status()->successMessage('Test');
        });
        $job->handle();
    }

    /** @test */
    public function it_does_not_throw_an_error_if_without_tracking_is_used(){
        $exceptionThrown = false;

        try {
            $job = new JobFake(callback: function(JobFake $job) {
                $job->status()->successMessage('Test');
            });
            $job->withoutTracking();
            $job->handle();
        } catch (\Throwable $e) {
            $exceptionThrown = true;
            throw $e;
        }
        $this->assertFalse($exceptionThrown);
    }


}
