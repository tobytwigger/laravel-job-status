<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Testing\Assert;
use JobStatus\Exception\JobCancelledException;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class SyncQueueTest extends TestCase
{

    /** @test */
    public function a_run_is_handled(){

        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->dispatchSync();
    }


    public static function a_run_is_handled_callback(JobFake $job)
    {

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertEquals(JobFake::class, $jobStatus->job_class);
        Assert::assertEquals('my-fake-job', $jobStatus->job_alias);
        Assert::assertEquals('started', $jobStatus->status);
        Assert::assertEquals(0, $jobStatus->percentage);
        Assert::assertEquals('', $jobStatus->job_id);
        Assert::assertEquals('sync', $jobStatus->connection_name);

        Assert::assertCount(2, $jobStatus->tags);
        Assert::assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        Assert::assertEquals(1, $jobStatus->tags[0]->value);
        Assert::assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        Assert::assertEquals('mytag-value', $jobStatus->tags[1]->value);

        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        Assert::assertCount(2, $jobStatus->statuses);
        Assert::assertEquals('queued', $jobStatus->statuses[0]->status);
        Assert::assertEquals('started', $jobStatus->statuses[1]->status);
    }













    /** @test */
    public function a_successful_run_is_handled(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->dispatchSync();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('succeeded', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
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
        $exceptionThrown = false;
        try {
            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->setCallback(static::class . '@a_cancelled_run_is_handled_callback')
                ->dispatchSync();
        } catch (\Throwable $e) {
            $this->assertEquals(JobCancelledException::class, get_class($e));
            $this->assertEquals('Job stopped with signal cancel', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('cancelled', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
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
        $exceptionThrown = false;
        try {
            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->setCallback(static::class . '@a_cancelled_custom_signal_run_is_handled_callback')
                ->handleSignal('custom_signal', static::class . '@a_cancelled_custom_signal_run_is_handled_custom_signal_callback')
                ->dispatchSync();
        } catch (\Throwable $e) {
            $this->assertEquals(JobCancelledException::class, get_class($e));
            $this->assertEquals('Job stopped with signal custom_signal', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);
        $this->assertTrue(static::$calledCancelledCustomSignal);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('cancelled', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
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
        $exceptionThrown = false;
        try {

            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->setCallback(static::class . '@a_failed_run_is_handled_callback')
                ->maxTries(1)
                ->maxExceptions(1)
                ->dispatchSync();
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Test', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
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
    public function a_failed_and_retry_run_is_handled_without_retrying_as_sync_cannot_retry(){
        $exceptionThrown = false;
        try {
            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->maxTries(2)
                ->maxExceptions(2)
                ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
                ->dispatchSync();
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Test', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->job_class);
        $this->assertEquals('my-fake-job', $jobStatus->job_alias);
        $this->assertEquals('failed', $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
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


    public static function a_failed_and_retry_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }










}
