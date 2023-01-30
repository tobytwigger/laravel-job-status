<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Bus;
use Illuminate\Testing\Assert;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class DatabaseQueueTest extends TestCase
{
    /** @test */
    public function a_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->setUsers([1, 2])
            ->setPublic(true)
            ->dispatch();

        $this->assertNull(JobStatus::first()->exception, JobStatus::first()->exception?->message ?? 'An error occured');
    }


    public static function a_run_is_handled_callback(JobFake $job)
    {
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        Assert::assertEquals(JobFake::class, $jobStatus->class);
        Assert::assertEquals('my-fake-job', $jobStatus->alias);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->status);
        Assert::assertEquals(0, $jobStatus->percentage);
        Assert::assertEquals(1, $jobStatus->job_id);
        Assert::assertEquals('database', $jobStatus->connection_name);
        Assert::assertEquals(true, $jobStatus->public);

        Assert::assertCount(2, $jobStatus->tags);
        Assert::assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        Assert::assertEquals(1, $jobStatus->tags[0]->value);
        Assert::assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        Assert::assertEquals('mytag-value', $jobStatus->tags[1]->value);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        Assert::assertNull($jobStatus->exception);

        Assert::assertCount(2, $jobStatus->users()->get());
        Assert::assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        Assert::assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        Assert::assertCount(2, $jobStatus->statuses);
        Assert::assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
    }













    /** @test */
    public function a_successful_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
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

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);
    }







    /** @test */
    public function a_cancelled_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('The job has been cancelled', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals(\JobStatus\Enums\MessageType::WARNING, $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);
    }


    public static function a_cancelled_run_is_handled_callback(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
    }








    /** @test */
    public function a_cancelled_custom_signal_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_custom_signal_run_is_handled_callback')
            ->handleSignal('custom_signal', static::class . '@a_cancelled_custom_signal_run_is_handled_custom_signal_callback')
            ->dispatch();

        $this->assertTrue(static::$calledCancelledCustomSignal);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(1, $jobStatus->messages()->orderBy('id')->get());
        $this->assertEquals('The job has been cancelled', $jobStatus->messages()->orderBy('id')->get()[0]->message);
        $this->assertEquals(\JobStatus\Enums\MessageType::WARNING, $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);
    }

    public static bool $calledCancelledCustomSignal = false;

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
    public function a_failed_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_failed_run_is_handled_callback')
            ->maxTries(1)
            ->setPublic(false)
            ->maxExceptions(1)
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertEquals(false, $jobStatus->public);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);
    }


    public static function a_failed_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }








    /** @test */
    public function a_failed_and_retry_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setUsers([1, 2])
            ->setPublic(false)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->status);
        $this->assertEquals(0, $jobStatusRetry->percentage);
        $this->assertEquals(1, $jobStatusRetry->job_id); // has not yet been changed to 2 since has not ran
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(2, $jobStatusRetry->users()->get());
        $this->assertEquals(1, $jobStatusRetry->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatusRetry->users()->get()[1]->user_id);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        Assert::assertNull($jobStatusRetry->batch);

        $this->assertNull($jobStatusRetry->exception);

        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());

        $this->assertCount(1, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);

        Assert::assertCount(0, JobBatch::all());

    }


    public static function a_failed_and_retry_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }












    /** @test */
    public function a_failed_and_retry_run_is_handled_after_a_rerun()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setUsers([1,2])
            ->setPublic(true)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_after_a_rerun_callback')
            ->dispatch(2);

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        Assert::assertNull($jobStatus->batch);

        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        $jobStatusRetry = JobStatus::all()[1];
        Assert::assertNull($jobStatusRetry->batch);

        $this->assertEquals(JobFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->public);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(2, $jobStatusRetry->users()->get());
        $this->assertEquals(1, $jobStatusRetry->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatusRetry->users()->get()[1]->user_id);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatusRetry->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->statuses[2]->status);

        Assert::assertCount(0, JobBatch::all());
    }


    public static function a_failed_and_retry_run_is_handled_after_a_rerun_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }








    /** @test */
    public function it_does_not_track_a_new_job_when_failed_and_retried_and_already_manually_released()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
    }


    public static function it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback(JobFake $job)
    {
        $job->release();

        throw new \Exception('Test');
    }











    /** @test */
    public function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setUsers([1,2])
            ->setPublic(false)
            ->setCallback(static::class . '@it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback')
            ->dispatch(2);

        Assert::assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
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
        $this->assertNull($jobStatus->exception);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-job', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(false, $jobStatusRetry->public);

        $this->assertCount(2, $jobStatusRetry->users()->get());
        $this->assertEquals(1, $jobStatusRetry->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatusRetry->users()->get()[1]->user_id);

        $this->assertCount(2, $jobStatusRetry->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetry->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetry->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetry->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetry->tags[1]->value);

        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());

        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatusRetry->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatusRetry->statuses[2]->status);
        Assert::assertNull($jobStatusRetry->batch);

        Assert::assertCount(0, JobBatch::all());


        $jobStatusRetryNotRan = JobStatus::all()[2];
        $this->assertEquals(JobFake::class, $jobStatusRetryNotRan->class);
        $this->assertEquals('my-fake-job', $jobStatusRetryNotRan->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->status);
        $this->assertEquals(0, $jobStatusRetryNotRan->percentage);
        $this->assertEquals(2, $jobStatusRetryNotRan->job_id);
        $this->assertEquals('database', $jobStatusRetryNotRan->connection_name);
        $this->assertNotNull($jobStatusRetryNotRan->uuid);
        $this->assertEquals(false, $jobStatusRetryNotRan->public);

        $this->assertCount(2, $jobStatusRetryNotRan->tags);
        $this->assertEquals('my-first-tag', $jobStatusRetryNotRan->tags[0]->key);
        $this->assertEquals(1, $jobStatusRetryNotRan->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatusRetryNotRan->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatusRetryNotRan->tags[1]->value);

        $this->assertCount(0, $jobStatusRetryNotRan->messages()->orderBy('id')->get());

        $this->assertCount(1, $jobStatusRetryNotRan->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->statuses[0]->status);

        Assert::assertNull($jobStatusRetryNotRan->batch);
    }


    public static function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback(JobFake $job)
    {
        $job->release();
    }















    /** @test */
    public function it_handles_a_full_run_with_batches(){
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $job2 = (new JobFakeFactory())
            ->setAlias('my-fake-job-two')
            ->setTags(['my-first-tag' => 'two', 'my-second-tag' => 'two'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->setAlias('my-fake-job-three')
            ->setTags(['my-first-tag' => 'three', 'my-second-tag' => 'three'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $realBatch = Bus::batch([
            $job1, $job2, $job3
        ])->name('My Batch Name');
        JobFakeFactory::dispatchBatch($realBatch);


        dd(JobBatch::all()->toArray(), JobStatus::all()->toArray());
        $batch = JobBatch::all();
        $this->assertCount(1, $batch);
        $batch = $batch->first();
        $this->assertEquals('My Batch Name', $batch->name);
        $this->assertEquals($realBatch->id, $batch->id);

        $this->assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::all()[0];
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job-one', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertEquals($batch->id, $jobStatus->batch_id);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals('one', $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('one', $jobStatus->tags[1]->value);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        $this->assertNull($jobStatus->exception);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        $jobStatus = JobStatus::all()[1];
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job-two', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertEquals($batch->id, $jobStatus->batch_id);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals('two', $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('two', $jobStatus->tags[1]->value);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        $this->assertNull($jobStatus->exception);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        $jobStatus = JobStatus::all()[2];
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job-three', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertEquals($batch->id, $jobStatus->batch_id);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals('three', $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('three', $jobStatus->tags[1]->value);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        $this->assertNull($jobStatus->exception);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);


    }

    public static function it_handles_a_full_run_with_batches_callback(JobFake $jobFake)
    {

    }

    /** @test */
    public function it_handles_a_batch_with_first_job_failing(){
        // Fails, all others are marked as cancelled
    }

    /** @test */
    public function it_handles_a_batch_with_first_job_failing_and_being_retried(){
        // Marks future ones as cancelled, this one as two job statuses with a retry
    }

    /** @test */
    public function it_handles_a_batch_with_first_job_cancelled(){
        // Rest are all marked as cancelled too
    }

    /** @test */
    public function it_handles_chained_jobs_within_a_batch(){
        // Two chained jobs with a batch
    }

    /** @test */
    public function it_handles_adding_a_job_from_inside_a_batch(){
        // Check the batch updates to manage it
    }

    /** @test */
    public function it_handles_a_failing_batch_with_allow_failures(){
        // First job fails, others pass fine.
    }

    /** @test */
    public function it_handles_retrying_a_failed_batch(){

    }

}
