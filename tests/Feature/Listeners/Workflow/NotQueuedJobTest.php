<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Testing\Assert;
use JobStatus\Concerns\Trackable;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class NotQueuedJobTest extends TestCase
{

    public static $handleWasCalled = false;

    /** @test */
    public function no_job_status_is_created_for_a_totally_syncronous_job()
    {
        $job = new class {
            use Trackable;

            public function handle()
            {
                NotQueuedJobTest::$handleWasCalled = true;
            }
        };

        app(Dispatcher::class)->dispatchNow($job);

        Assert::assertCount(0, JobStatus::all());
        $this->assertTrue(static::$handleWasCalled);
    }

}
