<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Bus;
use Illuminate\Testing\Assert;
use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Tests\fakes\AssertBatch;
use JobStatus\Tests\fakes\AssertJobStatus;
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

    public static function a_cancelled_custom_signal_run_is_handled_custom_signal_callback(JobFake $job)
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
            ->setUsers([1, 2])
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
            ->setUsers([1, 2])
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
    public function it_handles_a_full_run_with_batches()
    {
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

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-three')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            );
    }


    /** @test */
    public function it_handles_a_batch_with_first_job_failing()
    {
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_failed')
            ->create();

        $job2 = (new JobFakeFactory())
            ->setAlias('my-fake-job-two')
            ->setTags(['my-first-tag' => 'two', 'my-second-tag' => 'two'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_after_failed')
            ->create();

        $job3 = (new JobFakeFactory())
            ->setAlias('my-fake-job-three')
            ->setTags(['my-first-tag' => 'three', 'my-second-tag' => 'three'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_after_failed')
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::FAILED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withExceptionMessage('Job has failed')
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::FAILED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::CANCELLED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            )->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasStatus(Status::CANCELLED)
                ->hasAlias('my-fake-job-three')
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            );
    }

    public static function it_handles_a_batch_with_first_job_failing_callback_failed(JobFake $job)
    {
        throw new \Exception('Job has failed');
    }

    public static function it_handles_a_batch_with_first_job_failing_callback_after_failed(JobFake $job)
    {
        if ($job->batch()->cancelled()) {
            return;
        }
    }


    /** @test */
    public function it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status()
    {
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status_callback_failed')
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

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::FAILED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withExceptionMessage('Job has failed')
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::FAILED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::CANCELLED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            )->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasStatus(Status::CANCELLED)
                ->hasAlias('my-fake-job-three')
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            );
    }

    public static function it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status_callback_failed(JobFake $job)
    {
        throw new \Exception('Job has failed');
    }


    /** @test */
    public function it_handles_a_batch_with_first_job_cancelled()
    {
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_cancelled_callback_failed')
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

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::CANCELLED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::CANCELLED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            )->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasStatus(Status::CANCELLED)
                ->hasAlias('my-fake-job-three')
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([
                    ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING]
                ])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::CANCELLED,
                ])
                ->withUsers([])
            );
    }


    public static function it_handles_a_batch_with_first_job_cancelled_callback_failed(JobFake $job)
    {
        $job->batch()->cancel();

        if ($job->batch()->cancelled()) {
            return;
        }
    }


    /** @test */
    public function it_handles_a_failing_batch_with_allow_failures()
    {
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_failing_batch_with_allow_failures_callback_failed')
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

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name')->allowFailures()
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::FAILED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withExceptionMessage('Job has failed')
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::FAILED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasStatus(Status::SUCCEEDED)
                ->hasAlias('my-fake-job-three')
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            );
    }

    public static function it_handles_a_failing_batch_with_allow_failures_callback_failed(JobFake $job)
    {
        throw new \Exception('Job has failed');
    }





    /** @test */
    public function it_handles_adding_a_job_from_inside_a_batch()
    {
        $job1 = (new JobFakeFactory())
            ->setAlias('my-fake-job-one')
            ->setTags(['my-first-tag' => 'one', 'my-second-tag' => 'one'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_adding_a_job_from_inside_a_batch_callback')
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

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3
            ])->name('My Batch Name'),
            5
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(5)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-three')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(3, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-four')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(4)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'four',
                    'my-second-tag' => 'four'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(4, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-five')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(5)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'five',
                    'my-second-tag' => 'five'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            );;

        // Check the batch updates to manage it
    }

    public static function it_handles_adding_a_job_from_inside_a_batch_callback(JobFake $job)
    {
        $job4 = (new JobFakeFactory())
            ->setAlias('my-fake-job-four')
            ->setTags(['my-first-tag' => 'four', 'my-second-tag' => 'four'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $job5 = (new JobFakeFactory())
            ->setAlias('my-fake-job-five')
            ->setTags(['my-first-tag' => 'five', 'my-second-tag' => 'five'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $job->batch()->add([$job4, $job5]);
    }





    /** @test */
    public function it_handles_chained_jobs_within_a_batch()
    {

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

        $job4 = (new JobFakeFactory())
            ->setAlias('my-fake-job-four')
            ->setTags(['my-first-tag' => 'four', 'my-second-tag' => 'four'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                [$job1, $job2], [$job3, $job4]
            ])->name('My Batch Name'),
            4
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(0, fn(AssertBatch $batch) => $batch
                ->hasName('My Batch Name')
                ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(4)
            ->withIndex(0, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-one')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(1)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'one',
                    'my-second-tag' => 'one'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(1, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-three')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(2)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'three',
                    'my-second-tag' => 'three'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(3)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'two',
                    'my-second-tag' => 'two'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            )
            ->withIndex(3, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-four')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId(4)
                ->hasConnectionName('database')
                ->hasBatchId($realBatch->id)
                ->hasNonNullUuid()
                ->isPublic(true)
                ->withTags([
                    'my-first-tag' => 'four',
                    'my-second-tag' => 'four'
                ])
                ->withMessages([])
                ->withNoException()
                ->withPastStatuses([
                    \JobStatus\Enums\Status::QUEUED,
                    \JobStatus\Enums\Status::STARTED,
                    \JobStatus\Enums\Status::SUCCEEDED,
                ])
                ->withUsers([])
            );
    }




}
