<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Testing\Assert;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;
use JobStatus\Tests\fakes\AssertJobStatus;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\fakes\ListenerFake;
use JobStatus\Tests\TestCase;

class ListenerQueueTest extends TestCase
{
    /**
     * @test
     */
    public function a_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);

        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value', 'my-indexless-tag'])
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->setUsers([1, 2])
            ->setIsUnprotected(true)
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        $this->assertCount(1, JobStatus::all());
        $this->assertNull(JobStatus::first()->exception, JobStatus::first()->exception?->message ?? 'An error occured');
    }


    public static function a_run_is_handled_callback(ListenerFake $job)
    {
        try {
            Assert::assertCount(1, JobStatus::all());
            $jobStatus = JobStatus::first();
            Assert::assertNotNull($jobStatus->payload);
            Assert::assertEquals('my-database-queue', $jobStatus->queue);
            Assert::assertEquals(ListenerFake::class, $jobStatus->class);
            Assert::assertEquals('my-fake-listener', $jobStatus->alias);
            Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->status);
            Assert::assertEquals(0, $jobStatus->percentage);
            Assert::assertEquals(1, $jobStatus->job_id);
            Assert::assertEquals('database', $jobStatus->connection_name);
            Assert::assertEquals(true, $jobStatus->is_unprotected);

            Assert::assertCount(3, $jobStatus->tags);
            Assert::assertEquals('my-first-tag', $jobStatus->tags[0]->key);
            Assert::assertEquals(1, $jobStatus->tags[0]->value);
            Assert::assertFalse($jobStatus->tags[0]->is_indexless);
            Assert::assertEquals('my-second-tag', $jobStatus->tags[1]->key);
            Assert::assertEquals('mytag-value', $jobStatus->tags[1]->value);
            Assert::assertFalse($jobStatus->tags[1]->is_indexless);
            Assert::assertEquals('my-indexless-tag', $jobStatus->tags[2]->key);
            Assert::assertNull($jobStatus->tags[2]->value);
            Assert::assertTrue($jobStatus->tags[2]->is_indexless);

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
        } catch (\Throwable $e) {
            dd($e);
        }
    }

    /** @test */
    public function models_can_be_stopped_from_being_saved()
    {
        config()->set('laravel-job-status.collectors.messages.enabled', false);
        config()->set('laravel-job-status.collectors.signals.enabled', false);
        config()->set('laravel-job-status.collectors.status_history.enabled', false);

        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->onQueue('a-different-queue')
            ->dispatchAsListener();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('a-different-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(0, $jobStatus->tags);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(0, $jobStatus->signals()->orderBy('id')->get());

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());

        $this->assertNull($jobStatus->exception);

        $this->assertCount(0, $jobStatus->statuses);
    }

    public static function models_can_be_stopped_from_being_saved_callback(ListenerFake $job)
    {
        $job->status()->message('My test message');
        $job->status()->cancel();
    }

    /** @test */
    public function a_successful_run_is_handled()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-only-indexless-tag'])
            ->onQueue(null)
            ->dispatchAsListener();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('default', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertCount(1, $jobStatus->tags);
        $this->assertEquals('my-only-indexless-tag', $jobStatus->tags[0]->key);
        $this->assertNull($jobStatus->tags[0]->value);
        $this->assertTrue($jobStatus->tags[0]->is_indexless);

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
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_run_is_handled_callback')
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
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

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);
    }


    public static function a_cancelled_run_is_handled_callback(ListenerFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
    }


    /** @test */
    public function a_cancelled_custom_signal_run_is_handled()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_cancelled_custom_signal_run_is_handled_callback')
            ->handleSignal('custom_signal', static::class . '@a_cancelled_custom_signal_run_is_handled_custom_signal_callback')
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        $this->assertTrue(static::$calledCancelledCustomSignal);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
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

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);
    }

    public static bool $calledCancelledCustomSignal = false;

    public static function a_cancelled_custom_signal_run_is_handled_callback(ListenerFake $job)
    {
        $job->status()->sendSignal('custom_signal', cancel: true);
        $job->checkForSignals();
    }

    public static function a_cancelled_custom_signal_run_is_handled_custom_signal_callback(ListenerFake $job)
    {
        static::$calledCancelledCustomSignal = true;
    }


    /** @test */
    public function a_failed_run_is_handled()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_failed_run_is_handled_callback')
            ->maxTries(1)
            ->setIsUnprotected(false)
            ->maxExceptions(1)
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        $this->assertEquals(false, $jobStatus->is_unprotected);

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


    public static function a_failed_run_is_handled_callback(ListenerFake $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function a_failed_and_retry_run_is_handled()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setUsers([1, 2])
            ->setIsUnprotected(false)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(false, $jobStatus->is_unprotected);

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
        $this->assertNull($jobStatusRetry->payload);
        $this->assertEquals('my-database-queue', $jobStatusRetry->queue);
        $this->assertEquals(ListenerFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-listener', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->status);
        $this->assertEquals(0, $jobStatusRetry->percentage);
        $this->assertEquals(1, $jobStatusRetry->job_id); // has not yet been changed to 2 since has not ran
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(false, $jobStatus->is_unprotected);

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


    public static function a_failed_and_retry_run_is_handled_callback(ListenerFake $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function a_failed_and_retry_run_is_handled_after_a_rerun()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setUsers([1, 2])
            ->setIsUnprotected(true)
            ->onQueue('my-database-queue')
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_after_a_rerun_callback')
            ->dispatchAsListener(2);

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        Assert::assertNull($jobStatus->batch);

        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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

        $this->assertNotNull($jobStatusRetry->payload);
        $this->assertEquals('my-database-queue', $jobStatusRetry->queue);
        $this->assertEquals(ListenerFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-listener', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->is_unprotected);

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


    public static function a_failed_and_retry_run_is_handled_after_a_rerun_callback(ListenerFake $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function it_does_track_a_new_job_when_failed_and_retried_and_already_manually_released()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback')
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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

        $jobStatus = JobStatus::get()[1];
        $this->assertNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->status);
        $this->assertEquals(0, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertNull($jobStatus->exception);

        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        $this->assertCount(1, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
    }


    public static function it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback(ListenerFake $job)
    {
        $job->release();

        throw new \Exception('Test');
    }


    /** @test */
    public function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(2)
            ->onQueue('my-database-queue')
            ->maxExceptions(2)
            ->setUsers([1, 2])
            ->setIsUnprotected(false)
            ->setCallback(static::class . '@it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback')
            ->dispatchAsListener(2);

        Assert::assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertNotNull($jobStatus->payload);
        $this->assertEquals('my-database-queue', $jobStatus->queue);
        $this->assertEquals(ListenerFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-listener', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::RELEASED, $jobStatus->status);
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
        $this->assertEquals(false, $jobStatus->is_unprotected);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::RELEASED, $jobStatus->statuses[2]->status);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertNotNull($jobStatusRetry->payload);
        $this->assertEquals('my-database-queue', $jobStatusRetry->queue);
        $this->assertEquals(ListenerFake::class, $jobStatusRetry->class);
        $this->assertEquals('my-fake-listener', $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::RELEASED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(false, $jobStatusRetry->is_unprotected);

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
        $this->assertEquals(\JobStatus\Enums\Status::RELEASED, $jobStatusRetry->statuses[2]->status);
        Assert::assertNull($jobStatusRetry->batch);

        Assert::assertCount(0, JobBatch::all());


        $jobStatusRetryNotRan = JobStatus::all()[2];
        $this->assertNull($jobStatusRetryNotRan->payload);
        $this->assertEquals('my-database-queue', $jobStatusRetryNotRan->queue);
        $this->assertEquals(ListenerFake::class, $jobStatusRetryNotRan->class);
        $this->assertEquals('my-fake-listener', $jobStatusRetryNotRan->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->status);
        $this->assertEquals(0, $jobStatusRetryNotRan->percentage);
        $this->assertEquals(2, $jobStatusRetryNotRan->job_id);
        $this->assertEquals('database', $jobStatusRetryNotRan->connection_name);
        $this->assertNotNull($jobStatusRetryNotRan->uuid);
        $this->assertEquals(false, $jobStatusRetryNotRan->is_unprotected);

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


    public static function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback(ListenerFake $job)
    {
        $job->release();
    }

    /** @test */
    public function a_successful_run_can_be_retried()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setUsers([1, 2])
            ->setIsUnprotected(true)
            ->onQueue('my-database-queue')
            ->dispatchAsListener();

        $this->assertJobs()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasPayload()
                    ->hasQueue('my-database-queue')
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasNonNullUuid()
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([1, 2])
            );


        $jobRun = new JobRun(JobStatus::first());

        $jobRun->retry();


        $this->assertJobs()
            ->hasCountInDatabase(2)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasPayload()
                    ->hasQueue('my-database-queue')
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasNonNullUuid()
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([1, 2])
            )->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasPayload()
                    ->hasQueue('my-database-queue')
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::QUEUED)
                    ->hasPercentage(0)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasNonNullUuid()
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                    ])
                    ->withUsers([1, 2])
            );


        (new JobFakeFactory())
            ->onQueue('my-database-queue')
            ->runQueueWorker(1);

        $this->assertJobs()
            ->hasCountInDatabase(2)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasPayload()
                    ->hasQueue('my-database-queue')
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasNonNullUuid()
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([1, 2])
            )->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasPayload()
                    ->hasQueue('my-database-queue')
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasNonNullUuid()
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([1, 2])
            );

        $this->assertEquals(JobStatus::all()[0]->uuid, JobStatus::all()[1]->uuid);
    }


    /** @test */
    public function cannot_retry_a_queued_job()
    {
        $this->expectException(\JobStatus\Exceptions\CannotBeRetriedException::class);
        $this->expectExceptionMessage('All the following fields must be given: Queue, Payload');

        (new JobFakeFactory())
            ->setAlias('my-fake-listener')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->setUsers([1, 2])
            ->setIsUnprotected(true)
            ->onQueue('my-database-queue')
            ->dispatchAsListener(0);


        $this->assertJobs()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->missingPayload()
                    ->hasQueue(null)
                    ->hasClass(ListenerFake::class)
                    ->hasAlias('my-fake-listener')
                    ->hasStatus(Status::QUEUED)
                    ->hasPercentage(0)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasUuid(null)
                    ->isUnprotected(true)
                    ->withTags([
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                    ])
                    ->withUsers([1, 2])
            );


        $jobRun = new JobRun(JobStatus::first());

        $jobRun->retry();
    }
}
