<?php

namespace JobStatus\Tests\Feature\Listeners;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class ListenerTest extends TestCase
{

    /** @test */
    public function it_changes_the_status_when_successful(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@it_changes_the_status_when_successful_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertCount(0, $jobStatus->messages);
        Assert::assertEquals('succeeded', $jobStatus->status);
    }


    public static function it_changes_the_status_when_successful_callback(JobFake $job)
    {
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertTrue($jobStatus->is($job->getJobStatus()));
        Assert::assertEquals('started', $jobStatus->status);
    }






    /** @test */
    public function it_changes_the_status_when_failed(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@it_changes_the_status_when_failed_callback')
            ->maxExceptions(1)
            ->dispatch();

        // Problematic. Here job processing uses $event->id which is different to the uuid so we get two job statuses appearing!

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertEquals('failed', $jobStatus->status);
    }

    public static function it_changes_the_status_when_failed_callback(JobFake $job)
    {
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertTrue($jobStatus->is($job->getJobStatus()));
        Assert::assertEquals('started', $jobStatus->status);
        throw new \Exception('This is a test message');
    }


    /** @test */
    public function it_changes_the_status_when_cancelled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@it_changes_the_status_when_cancelled_callback')
            ->maxExceptions(1)
            ->dispatch();

        // Problematic. Here job processing uses $event->id which is different to the uuid so we get two job statuses appearing!

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertEquals('cancelled', $jobStatus->status);
    }

    public static function it_changes_the_status_when_cancelled_callback(JobFake $job)
    {
        $job->status()->cancel();
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertTrue($jobStatus->is($job->getJobStatus()));
        Assert::assertEquals('started', $jobStatus->status);
        $job->checkForSignals();
    }







    /** @test */
    public function it_tracks_a_new_job_when_failed_and_retried(){

    }

    /** @test */
    public function it_saves_tags(){

    }

    /** @test */
    public function it_creates_a_job_status_for_sync_jobs(){

    }

    /** @test */
    public function it_sets_percentage_to_100_when_finished_successfully(){

    }

    /** @test */
    public function it_sets_percentage_to_100_when_failed(){

    }

    /** @test */
    public function it_sets_percentage_to_100_when_cancelled(){

    }

}
