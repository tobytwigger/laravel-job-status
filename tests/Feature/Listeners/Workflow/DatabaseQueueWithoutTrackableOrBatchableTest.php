<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\fakes\JobFakeWithoutTrackableOrBatchable;
use JobStatus\Tests\TestCase;

class DatabaseQueueWithoutTrackableOrBatchableTest extends TestCase
{
    /** @test */
    public function a_run_is_handled()
    {
        config()->set('laravel-job-status.track_anonymous', true);

        $job = (new JobFakeFactory())
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->withoutTrackable()
            ->withoutBatchable()
            ->dispatch();

        $this->assertNull(JobStatus::first()->exception, JobStatus::first()->exception?->message ?? 'An error occured');
    }


    public static function a_run_is_handled_callback(JobFakeWithoutTrackableOrBatchable $job)
    {
        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();

        Assert::assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        Assert::assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->status);
        Assert::assertEquals(0, $jobStatus->percentage);
        Assert::assertEquals(1, $jobStatus->job_id);
        Assert::assertEquals('database', $jobStatus->connection_name);
        Assert::assertEquals(true, $jobStatus->is_unprotected);

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
    public function it_saves_nothing_when_config_set()
    {
        config()->set('laravel-job-status.track_anonymous', false);

        $job = (new JobFakeFactory())
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->withoutTrackable()
            ->withoutBatchable()
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
            ->withoutBatchable()
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
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
            ->withoutBatchable()
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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


    public static function a_failed_run_is_handled_callback(JobFakeWithoutTrackableOrBatchable $job)
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
            ->withoutBatchable()
            ->maxExceptions(2)
            ->setCallback(static::class . '@a_failed_and_retry_run_is_handled_callback')
            ->dispatch();

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->status);
        $this->assertEquals(0, $jobStatusRetry->percentage);
        $this->assertEquals(1, $jobStatusRetry->job_id); // has not yet been changed to 2 since has not ran
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

        $this->assertCount(0, $jobStatusRetry->users()->get());
        $this->assertCount(0, $jobStatusRetry->tags);
        Assert::assertNull($jobStatusRetry->batch);
        $this->assertNull($jobStatusRetry->exception);
        $this->assertCount(0, $jobStatusRetry->messages()->orderBy('id')->get());
        $this->assertCount(1, $jobStatusRetry->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetry->statuses[0]->status);
        Assert::assertCount(0, JobBatch::all());
    }


    public static function a_failed_and_retry_run_is_handled_callback(JobFakeWithoutTrackableOrBatchable $job)
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
            ->withoutBatchable()
            ->dispatch(2);

        Assert::assertCount(2, JobStatus::all());

        $jobStatus = JobStatus::first();
        Assert::assertNull($jobStatus->batch);

        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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

        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->is_unprotected);

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


    public static function a_failed_and_retry_run_is_handled_after_a_rerun_callback(JobFakeWithoutTrackableOrBatchable $job)
    {
        throw new \Exception('Test');
    }


    /** @test */
    public function it_does_not_track_a_new_job_when_failed_and_retried_and_already_manually_released()
    {
        config()->set('laravel-job-status.track_anonymous', true);
        $job = (new JobFakeFactory())
            ->withoutTrackable()
            ->withoutBatchable()
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback')
            ->dispatch();

        Assert::assertCount(1, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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


    public static function it_tracks_a_new_job_when_failed_and_retried_if_already_manually_released_callback(JobFakeWithoutTrackableOrBatchable $job)
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
            ->withoutBatchable()
            ->maxTries(2)
            ->maxExceptions(2)
            ->setCallback(static::class . '@it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback')
            ->dispatch(2);

        Assert::assertCount(3, JobStatus::all());

        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals(1, $jobStatus->job_id);
        $this->assertEquals('database', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->is_unprotected);

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
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetry->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatusRetry->status);
        $this->assertEquals(100, $jobStatusRetry->percentage);
        $this->assertEquals(2, $jobStatusRetry->job_id);
        $this->assertEquals('database', $jobStatusRetry->connection_name);
        $this->assertNotNull($jobStatusRetry->uuid);
        $this->assertEquals(true, $jobStatusRetry->is_unprotected);

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
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetryNotRan->class);
        $this->assertEquals(JobFakeWithoutTrackableOrBatchable::class, $jobStatusRetryNotRan->alias);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->status);
        $this->assertEquals(0, $jobStatusRetryNotRan->percentage);
        $this->assertEquals(2, $jobStatusRetryNotRan->job_id);
        $this->assertEquals('database', $jobStatusRetryNotRan->connection_name);
        $this->assertNotNull($jobStatusRetryNotRan->uuid);
        $this->assertEquals(true, $jobStatusRetryNotRan->is_unprotected);

        $this->assertCount(0, $jobStatusRetryNotRan->tags);
        $this->assertCount(0, $jobStatusRetryNotRan->messages()->orderBy('id')->get());
        $this->assertCount(1, $jobStatusRetryNotRan->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatusRetryNotRan->statuses[0]->status);
        Assert::assertNull($jobStatusRetryNotRan->batch);
    }


    public static function it_does_track_a_new_job_when_succeeded_and_retried_and_already_manually_released_callback(JobFakeWithoutTrackableOrBatchable $job)
    {
        $job->release();
    }
}
