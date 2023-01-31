<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Testing\Assert;
use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\AssertBatch;
use JobStatus\Tests\fakes\AssertJobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class SyncQueueTest extends TestCase
{
    /** @test */
    public function a_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@a_run_is_handled_callback')
            ->setUsers([1,2])
            ->dispatchSync();

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
        Assert::assertEquals('', $jobStatus->job_id);
        Assert::assertEquals('sync', $jobStatus->connection_name);

        Assert::assertCount(2, $jobStatus->tags);
        Assert::assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        Assert::assertEquals(1, $jobStatus->tags[0]->value);
        Assert::assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        Assert::assertEquals('mytag-value', $jobStatus->tags[1]->value);

        Assert::assertCount(2, $jobStatus->users()->get());
        Assert::assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        Assert::assertEquals(2, $jobStatus->users()->get()[1]->user_id);

        Assert::assertCount(0, $jobStatus->messages()->orderBy('id')->get());

        Assert::assertNull($jobStatus->exception);

        Assert::assertCount(2, $jobStatus->statuses);
        Assert::assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        Assert::assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
    }













    /** @test */
    public function a_successful_run_is_handled()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->dispatchSync();

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->status);
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

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::SUCCEEDED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
    }







    /** @test */
    public function a_cancelled_run_is_handled()
    {
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
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->status);
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
        $this->assertEquals(\JobStatus\Enums\MessageType::WARNING, $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
    }


    public static function a_cancelled_run_is_handled_callback(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
    }








    /** @test */
    public function a_cancelled_custom_signal_run_is_handled()
    {
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
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->status);
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
        $this->assertEquals(\JobStatus\Enums\MessageType::WARNING, $jobStatus->messages()->orderBy('id')->get()[0]->type);

        $this->assertNull($jobStatus->exception);

        $this->assertCount(3, $jobStatus->statuses);
        $this->assertEquals(\JobStatus\Enums\Status::QUEUED, $jobStatus->statuses[0]->status);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->statuses[1]->status);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->statuses[2]->status);

        Assert::assertNull($jobStatus->batch);
        Assert::assertCount(0, JobBatch::all());
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
        $exceptionThrown = false;

        try {
            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->setCallback(static::class . '@a_failed_run_is_handled_callback')
                ->maxTries(1)
                ->maxExceptions(1)
                ->setUsers([1,2])
                ->setPublic(true)
                ->dispatchSync();
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Test', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        Assert::assertCount(1, JobStatus::all());
        $jobStatus = JobStatus::first();
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(true, $jobStatus->public);

        $this->assertCount(2, $jobStatus->tags);
        $this->assertEquals('my-first-tag', $jobStatus->tags[0]->key);
        $this->assertEquals(1, $jobStatus->tags[0]->value);
        $this->assertEquals('my-second-tag', $jobStatus->tags[1]->key);
        $this->assertEquals('mytag-value', $jobStatus->tags[1]->value);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

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


    public static function a_failed_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
    }








    /** @test */
    public function a_failed_and_retry_run_is_handled_without_retrying_as_sync_cannot_retry()
    {
        $exceptionThrown = false;

        try {
            $job = (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
                ->maxTries(2)
                ->maxExceptions(2)
                ->setUsers([1,2])
                ->setPublic(false)
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
        $this->assertEquals(JobFake::class, $jobStatus->class);
        $this->assertEquals('my-fake-job', $jobStatus->alias);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->status);
        $this->assertEquals(100, $jobStatus->percentage);
        $this->assertEquals('', $jobStatus->job_id);
        $this->assertEquals('sync', $jobStatus->connection_name);
        $this->assertNotNull($jobStatus->uuid);
        $this->assertEquals(false, $jobStatus->public);

        $this->assertCount(2, $jobStatus->users()->get());
        $this->assertEquals(1, $jobStatus->users()->get()[0]->user_id);
        $this->assertEquals(2, $jobStatus->users()->get()[1]->user_id);

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


    public static function a_failed_and_retry_run_is_handled_callback(JobFake $job)
    {
        throw new \Exception('Test');
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

        $realBatch = JobFakeFactory::dispatchBatchSync(
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
            ->create();

        $job3 = (new JobFakeFactory())
            ->setAlias('my-fake-job-three')
            ->setTags(['my-first-tag' => 'three', 'my-second-tag' => 'three'])
            ->maxTries(1)
            ->maxExceptions(1)
            ->create();

        $exceptionThrown = false;

        try {
            $realBatch = JobFakeFactory::dispatchBatchSync(
                Bus::batch([
                    $job1, $job2, $job3
                ])->name('My Batch Name')
            );
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Job has failed', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        // Due to transaction not saving the job batch. Not a problem
        $this->assertBatches()->hasCountInDatabase(0);

        $this->assertJobs()->hasCountInDatabase(0);
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

        $exceptionThrown = false;

        try {
            $realBatch = JobFakeFactory::dispatchBatchSync(
                Bus::batch([
                    $job1, $job2, $job3
                ])->name('My Batch Name')
            );
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Job has failed', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        // Due to transaction not saving the job batch. Not a problem
        $this->assertBatches()->hasCountInDatabase(0);

        $this->assertJobs()->hasCountInDatabase(0);
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

        $realBatch = JobFakeFactory::dispatchBatchSync(
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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

        $exceptionThrown = false;

        try {
            $realBatch = JobFakeFactory::dispatchBatchSync(
                Bus::batch([
                    $job1, $job2, $job3
                ])->name('My Batch Name')
            );
        } catch (\Exception $e) {
            $this->assertEquals(\Exception::class, get_class($e));
            $this->assertEquals('Job has failed', $e->getMessage());
            $exceptionThrown = true;
        }

        $this->assertTrue($exceptionThrown);

        // Due to transaction not saving the job batch. Not a problem
        $this->assertBatches()->hasCountInDatabase(0);

        $this->assertJobs()->hasCountInDatabase(0);
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

        $realBatch = JobFakeFactory::dispatchBatchSync(
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasAlias('my-fake-job-four')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId('')
                ->hasConnectionName('sync')
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
            ->withIndex(2, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-five')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId('')
                ->hasConnectionName('sync')
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
            )
            ->withIndex(3, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-two')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId('')
                ->hasConnectionName('sync')
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
            ->withIndex(4, fn(AssertJobStatus $jobStatus) => $jobStatus
                ->hasClass(JobFake::class)
                ->hasAlias('my-fake-job-three')
                ->hasStatus(Status::SUCCEEDED)
                ->hasPercentage(100)
                ->hasJobId('')
                ->hasConnectionName('sync')
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

        $realBatch = JobFakeFactory::dispatchBatchSync(
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
                ->hasJobId('')
                ->hasConnectionName('sync')
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
