<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Testing\Assert;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class DatabaseQueueTest extends TestCase
{

    /** @test */
    public function a_run_is_handled(){

        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->dispatch();
    }


    public static function a_run_is_handled_callback(JobFake $job)
    {

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertEquals(JobFake::class, $jobStatus->job_class);
        Assert::assertEquals('my-fake-job', $jobStatus->job_alias);
        Assert::assertEquals('started', $jobStatus->status);
        Assert::assertEquals(0, $jobStatus->percentage);
        Assert::assertEquals(1, $jobStatus->job_id);
        Assert::assertEquals('database', $jobStatus->connection_name);

        Assert::assertCount(2, $jobStatus->tags);
        Assert::assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        Assert::assertEquals(1, $jobStatus->tags[0]->value);
        Assert::assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        Assert::assertEquals('mytag-value', $jobStatus->tags[1]->value);

        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        Assert::assertCount(1, $jobStatus->statuses);
        Assert::assertEquals('started', $jobStatus->statuses[0]->status);
    }













    /** @test */
    public function a_successful_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('succeeded', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());


        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('succeeded', $jobStatus->statuses[2]->status);
    }







    /** @test */
    public function a_cancelled_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('cancelled', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('The job has been cancelled', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('warning', $jobStatus->messages()->orderBy('id')->get()[0]->type);


        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('cancelled', $jobStatus->statuses[2]->status);
    }


    public static function a_cancelled_run_is_handled_callback(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
    }








    /** @test */
    public function a_cancelled_custom_signal_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_custom_signal_run_is_handled_callback')
            ->handleSignal('custom_signal', static::class . '@a_cancelled_custom_signal_run_is_handled_custom_signal_callback')
            ->dispatch();

        $this->assertTrue(static::$calledCancelledCustomSignal);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('cancelled', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('The job has been cancelled', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('warning', $jobStatus->messages()->orderBy('id')->get()[0]->type);


        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('cancelled', $jobStatus->statuses[2]->status);
    }

    static bool $calledCancelledCustomSignal = false;

    public static function a_cancelled_custom_signal_run_is_handled_callback(JobFake $job)
    {
        $job->status()->sendSignal('custom_signal', cancel: true);
        $job->checkForSignals();
    }

    public static function a_cancelled_custom_signal_run_is_handled_custom_signal_callback(JobFake $jobFake)
    {
        static::$calledCancelledCustomSignal = true;
    }











    /** @test */
    public function a_failed_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_failed_run_is_handled_callback')
            ->maxTries(1)
            ->maxExceptions(1)
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('Test', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('error', $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('failed', $jobStatus->statuses[2]->status);
    }


    public static function a_failed_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }








    /** @test */
    public function a_failed_and_retry_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('Test', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('error', $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('failed', $jobStatus->statuses[2]->status);


        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatusRetry->job_class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->job_alias);
        $this->assertEquals('queued', $jobStatusRetry->status);
        $this->assertEquals(0, $jobStatusRetry->percentage);
        $this->assertEquals(1, $jobStatusRetry->job_id); // has not yet been changed to 2 since has not ran
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());

        $this->assertCount(1, $jobStatusRetry->statuses);
        $this->assertEquals('queued', $jobStatusRetry->statuses[0]->status);
    }


    public static function a_failed_and_retry_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }












    /** @test */
    public function a_failed_and_retry_run_is_handled_after_a_rerun(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_after_a_rerun_callback')
            ->dispatch(2);

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('Test', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('error', $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('failed', $jobStatus->statuses[2]->status);


        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatusRetry->job_class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->job_alias);
        $this->assertEquals('failed', $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('Test', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('error', $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals('queued', $jobStatusRetry->statuses[0]->status);
        $this->assertEquals('started', $jobStatusRetry->statuses[1]->status);
        $this->assertEquals('failed', $jobStatusRetry->statuses[2]->status);
    }


    public static function a_failed_and_retry_run_is_handled_after_a_rerun_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }








    /** @test */
    public function it_does_not_track_a_new_job_when_failed_and_retried_and_already_manually_released(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('Test', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals('error', $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('failed', $jobStatus->statuses[2]->status);
    }


    public static function it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback(JobFake $job)
    {
        $job->release();
        throw new \Exception('Test');
    }











    /** @test */
    public function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback')
            ->dispatch(2);

        Assert::assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('succeeded', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals('queued', $jobStatus->statuses[0]->status);
        $this->assertEquals('started', $jobStatus->statuses[1]->status);
        $this->assertEquals('succeeded', $jobStatus->statuses[2]->status);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatusRetry->job_class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->job_alias);
        $this->assertEquals('succeeded', $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals('queued', $jobStatusRetry->statuses[0]->status);
        $this->assertEquals('started', $jobStatusRetry->statuses[1]->status);
        $this->assertEquals('succeeded', $jobStatusRetry->statuses[2]->status);



        $jobStatusRetryNotRan = JobStatus::all()[2];
        $this->assertEquals(JobFake::class, $jobStatusRetryNotRan->job_class);
        $this->assertEquals('my-fake-job', $jobStatusRetryNotRan->job_alias);
        $this->assertEquals('queued', $jobStatusRetryNotRan->status);
        $this->assertEquals(0, $jobStatusRetryNotRan->percentage);
        $this->assertEquals(2, $jobStatusRetryNotRan->job_id);
        $this->assertEquals('database', $jobStatusRetryNotRan->connection_name);
        $this->assertNotNull($jobStatusRetryNotRan->uuid);

        $this->assertCount(2, $jobStatusRetryNotRan->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetryNotRan->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetryNotRan->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetryNotRan->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetryNotRan->tags[1]->value);

        $this->assertCount(0, $jobStatusRetryNotRan->messages()->orderBy('id')->get());

        $this->assertCount(1, $jobStatusRetryNotRan->statuses);
        $this->assertEquals('queued', $jobStatusRetryNotRan->statuses[0]->status);
    }


    public static function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback(JobFake $job)
    {
        $job->release();
    }




}
