<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Support\Facades\Bus;
use Illuminate\Testing\Assert;
use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\AssertBatch;
use JobStatus\Tests\fakes\AssertJobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\fakes\JobFakeWithoutTrackable;
use JobStatus\Tests\TestCase;

class DatabaseQueueWithoutTrackableTest extends TestCase
{
    /** @test */
    public function a_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);

        $job = (new JobFakeFactory())
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->withoutTrackable()
            ->dispatch();

        $this->assertNull(JobStatus::first()->exception, JobStatus::first()->exception?->message ?? 'An error occured');
    }


    public static function a_run_is_handled_callback(JobFakeWithoutTrackable $job)
    {
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();

        Assert::assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        Assert::assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->status);
        Assert::assertEquals(0, $jobStatus->percentage);
        Assert::assertEquals(1, $jobStatus->job_id);
        Assert::assertEquals('database', $jobStatus->connection_name);
        Assert::assertEquals(true, $jobStatus->public);

        Assert::assertCount(0, $jobStatus->tags);
        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->signals()->orderBy('id')->get());
        Assert::assertNull($jobStatus->exception);
        Assert::assertCount(0, $jobStatus->users()->get());
        Assert::assertCount(2, $jobStatus->statuses);
        Assert::assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
    }


    /** @test */
    public function it_saves_nothing_when_config_set(){
        config()->set('laravel-job-status.track_anonymous', false);

        $job = (new JobFakeFactory())
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->withoutTrackable()
            ->dispatch();

        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_statuses');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_exceptions');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_batches');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_tags');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_messages');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_signals');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_statuses');
    }


    /** @test */
    public function a_successful_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->withoutTrackable()
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);

        Assert::assertCount(0, $jobStatus->tags);
        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->signals()->orderBy('id')->get());
        Assert::assertNull($jobStatus->exception);
        Assert::assertCount(0, $jobStatus->users()->get());
        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);
    }

    /** @test */
    public function a_failed_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->setCallback(static::class . '@a_failed_run_is_handled_callback')
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        Assert::assertCount(0, $jobStatus->tags);
        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->signals()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->users()->get());

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);
    }


    public static function a_failed_run_is_handled_callback(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function a_failed_and_retry_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->maxTries(2)
            ->withoutTrackable()
            ->maxExceptions(2)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        Assert::assertCount(0, $jobStatus->tags);
        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->signals()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->users()->get());

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->status);
        $this->assertEquals(0, $jobStatusRetry->percentage);
        $this->assertEquals(1, $jobStatusRetry->job_id); // has not yet been changed to 2 since has not ran
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(0, $jobStatusRetry->users()->get());
        $this->assertCount(0, $jobStatusRetry->tags);
        Assert::assertNull($jobStatusRetry->batch);
        $this->assertNull($jobStatusRetry->exception);
        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());
        $this->assertCount(1, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        Assert::assertCount(0, JobBatch::all());
    }


    public static function a_failed_and_retry_run_is_handled_callback(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function a_failed_and_retry_run_is_handled_after_a_rerun()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_after_a_rerun_callback')
            ->withoutTrackable()
            ->dispatch(2);

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        Assert::assertNull($jobStatus->batch);

        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        Assert::assertCount(0, $jobStatus->tags);
        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->signals()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatus->users()->get());

        $this->assertNotNull($jobStatus->exception);
        $this->assertEquals('Test', $jobStatus->exception->message);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        Assert::assertNull($jobStatusRetry->batch);

        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->public);

        Assert::assertCount(0, $jobStatusRetry->tags);
        Assert::assertNull($jobStatusRetry->batch);
        Assert::assertCount(0, JobBatch::all());
        Assert::assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatusRetry->signals()->orderBy('id')->get());
        Assert::assertCount(0, $jobStatusRetry->users()->get());

        $this->assertNotNull($jobStatusRetry->exception);
        $this->assertEquals('Test', $jobStatusRetry->exception->message);

        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatusRetry->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->statuses[2]->status);

        Assert::assertNull($jobStatusRetry->batch);
    }


    public static function a_failed_and_retry_run_is_handled_after_a_rerun_callback(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function it_does_not_track_a_new_job_when_failed_and_retried_and_already_manually_released()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->withoutTrackable()
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(0, $jobStatus->tags);
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


    public static function it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback(JobFakeWithoutTrackable $job)
    {
        $job->release();

        throw new \Exception('Test');
    }


    /** @test */
    public function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->withoutTrackable()
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback')
            ->dispatch(2);

        Assert::assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(0, $jobStatus->tags);
        $this->assertCount(0, $jobStatus->messages()->orderBy('id')->get());
        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        $this->assertCount(0, $jobStatus->users()->get());

        Assert::assertNull($jobStatus->batch);

        $jobStatusRetry = JobStatus::all()[1];
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->public);

        $this->assertCount(0, $jobStatusRetry->users()->get());
        $this->assertCount(0, $jobStatusRetry->tags);
        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());
        $this->assertCount(3, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatusRetry->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatusRetry->statuses[2]->status);
        Assert::assertNull($jobStatusRetry->batch);
        Assert::assertCount(0, JobBatch::all());

        $jobStatusRetryNotRan = JobStatus::all()[2];
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetryNotRan->class);
        $this->assertEquals(JobFakeWithoutTrackable::class, $jobStatusRetryNotRan->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->status);
        $this->assertEquals(0, $jobStatusRetryNotRan->percentage);
        $this->assertEquals(2, $jobStatusRetryNotRan->job_id);
        $this->assertEquals('database', $jobStatusRetryNotRan->connection_name);
        $this->assertNotNull($jobStatusRetryNotRan->uuid);
        $this->assertEquals(true, $jobStatusRetryNotRan->public);

        $this->assertCount(0, $jobStatusRetryNotRan->tags);
        $this->assertCount(0, $jobStatusRetryNotRan->messages()->orderBy('id')->get());
        $this->assertCount(1, $jobStatusRetryNotRan->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->statuses[0]->status);
        Assert::assertNull($jobStatusRetryNotRan->batch);
    }


    public static function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback(JobFakeWithoutTrackable $job)
    {
        $job->release();
    }


    /** @test */
    public function it_handles_a_full_run_with_batches()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job2 = (new JobFakeFactory())
            ->withoutTrackable()
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
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

        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->withoutTrackable()
            ->maxTries(1)
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_failed')
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_after_failed')
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_callback_after_failed')
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::FAILED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withExceptionMessage('Job has failed')
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::FAILED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
                    ])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::CANCELLED,
                    ])
                    ->withUsers([])
            )->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
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

    public static function it_handles_a_batch_with_first_job_failing_callback_failed(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Job has failed');
    }

    public static function it_handles_a_batch_with_first_job_failing_callback_after_failed(JobFakeWithoutTrackable $job)
    {
        if ($job->batch()->cancelled()) {
            return;
        }
    }


    /** @test */
    public function it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status_callback_failed')
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::FAILED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withExceptionMessage('Job has failed')
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::FAILED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
                    ])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::CANCELLED,
                    ])
                    ->withUsers([])
            )->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
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

    public static function it_handles_a_batch_with_first_job_failing_if_future_jobs_dont_check_batch_cancelled_status_callback_failed(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Job has failed');
    }


    /** @test */
    public function it_handles_a_batch_with_first_job_cancelled()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_batch_with_first_job_cancelled_callback_failed')
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name')
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
                    ])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::CANCELLED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
                    ])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::CANCELLED,
                    ])
                    ->withUsers([])
            )->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::CANCELLED)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([
                        ['message' => 'The batch that the job is a part of has been cancelled', 'type' => MessageType::WARNING],
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


    public static function it_handles_a_batch_with_first_job_cancelled_callback_failed(JobFakeWithoutTrackable $job)
    {
        $job->batch()->cancel();

        if ($job->batch()->cancelled()) {
            return;
        }
    }


    /** @test */
    public function it_handles_a_failing_batch_with_allow_failures()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->setCallback(static::class . '@it_handles_a_failing_batch_with_allow_failures_callback_failed')
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name')->allowFailures()
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(3)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::FAILED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withExceptionMessage('Job has failed')
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::FAILED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
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

    public static function it_handles_a_failing_batch_with_allow_failures_callback_failed(JobFakeWithoutTrackable $job)
    {
        throw new \Exception('Job has failed');
    }





    /** @test */
    public function it_handles_adding_a_job_from_inside_a_batch()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->setCallback(static::class . '@it_handles_adding_a_job_from_inside_a_batch_callback')
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                $job1, $job2, $job3,
            ])->name('My Batch Name'),
            5
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(5)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                3,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(4)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                4,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(5)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            );

        // Check the batch updates to manage it
    }

    public static function it_handles_adding_a_job_from_inside_a_batch_callback(JobFakeWithoutTrackable $job)
    {
        $job4 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->create();

        $job5 = (new JobFakeFactory())
            ->maxTries(1)
            ->maxExceptions(1)
            ->withoutTrackable()
            ->create();

        $job->batch()->add([$job4, $job5]);
    }





    /** @test */
    public function it_handles_chained_jobs_within_a_batch()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job1 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job2 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job3 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $job4 = (new JobFakeFactory())
            ->maxTries(1)
            ->withoutTrackable()
            ->maxExceptions(1)
            ->create();

        $realBatch = JobFakeFactory::dispatchBatch(
            Bus::batch([
                [$job1, $job2], [$job3, $job4],
            ])->name('My Batch Name'),
            4
        );

        $this->assertBatches()
            ->hasCountInDatabase(1)
            ->withIndex(
                0,
                fn (AssertBatch $batch) => $batch
                    ->hasName('My Batch Name')
                    ->hasBatchId($realBatch->id)
            );

        $this->assertJobs()
            ->hasCountInDatabase(4)
            ->withIndex(
                0,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(1)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                1,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(2)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                2,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(3)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
                    ->withMessages([])
                    ->withNoException()
                    ->withPastStatuses([
                        \JobStatus\Enums\Status::QUEUED,
                        \JobStatus\Enums\Status::STARTED,
                        \JobStatus\Enums\Status::SUCCEEDED,
                    ])
                    ->withUsers([])
            )
            ->withIndex(
                3,
                fn (AssertJobStatus $jobStatus) => $jobStatus
                    ->hasClass(JobFakeWithoutTrackable::class)
                    ->hasAlias(JobFakeWithoutTrackable::class)
                    ->hasStatus(Status::SUCCEEDED)
                    ->hasPercentage(100)
                    ->hasJobId(4)
                    ->hasConnectionName('database')
                    ->hasBatchId($realBatch->id)
                    ->hasNonNullUuid()
                    ->isPublic(true)
                    ->withTags([])
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
