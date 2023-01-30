<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use Illuminate\Testing\Assert;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
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
}
