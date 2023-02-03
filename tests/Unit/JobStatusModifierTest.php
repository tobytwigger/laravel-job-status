<?php

namespace JobStatus\Tests\Unit;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class JobStatusModifierTest extends TestCase
{
    /** @test */
    public function the_job_status_can_be_set_and_got()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $this->assertTrue($jobStatus->is($modifier->getJobStatus()));

        $modifier = JobStatusModifier::forJobStatus($jobStatus);
        $this->assertTrue($jobStatus->is($modifier->getJobStatus()));

        $modifier = JobStatusModifier::forJobStatus(null);
        $this->assertNull($modifier->getJobStatus());
    }

    /** @test */
    public function the_status_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setStatus(\JobStatus\Enums\Status::STARTED);
        $this->assertEquals(\JobStatus\Enums\Status::STARTED, $jobStatus->refresh()->status);
        $this->assertDatabaseCount('job_status_job_status_statuses', 1);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::STARTED->value]);

        $modifier->setStatus(\JobStatus\Enums\Status::FAILED);
        $this->assertEquals(\JobStatus\Enums\Status::FAILED, $jobStatus->refresh()->status);
        $this->assertDatabaseCount('job_status_job_status_statuses', 2);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::STARTED->value]);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::FAILED->value]);

        $modifier->setStatus(\JobStatus\Enums\Status::CANCELLED);
        $this->assertEquals(\JobStatus\Enums\Status::CANCELLED, $jobStatus->refresh()->status);
        $this->assertDatabaseCount('job_status_job_status_statuses', 3);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::STARTED->value]);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::FAILED->value]);
        $this->assertDatabaseHas('job_status_job_status_statuses', ['status' => Status::CANCELLED->value]);
    }

    /** @test */
    public function the_started_at_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create();
        $now = Carbon::now();
        $now2 = Carbon::now()->addMinute();

        $modifier = new JobStatusModifier($jobStatus);

        $this->assertNull($jobStatus->refresh()->started_at);

        $modifier->setStartedAt($now);
        $this->assertEquals($now->format('d-m-Y H:i:s.v'), $jobStatus->refresh()->started_at->format('d-m-Y H:i:s.v'));

        $modifier->setStartedAt($now2);
        $this->assertEquals($now2->format('d-m-Y H:i:s.v'), $jobStatus->refresh()->started_at->format('d-m-Y H:i:s.v'));
    }

    /** @test */
    public function the_finished_at_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create();
        $now = Carbon::now();
        $now2 = Carbon::now()->addMinute();

        $modifier = new JobStatusModifier($jobStatus);

        $this->assertNull($jobStatus->refresh()->finished_at);

        $modifier->setFinishedAt($now);
        $this->assertEquals($now->format('d-m-Y H:i:s.v'), $jobStatus->refresh()->finished_at->format('d-m-Y H:i:s.v'));

        $modifier->setFinishedAt($now2);
        $this->assertEquals($now2->format('d-m-Y H:i:s.v'), $jobStatus->refresh()->finished_at->format('d-m-Y H:i:s.v'));
    }

    /** @test */
    public function add_exception_adds_an_exception_without_previous()
    {
        $rawException = new \Exception('My exception message', 502, null);

        $jobStatus = JobStatus::factory()->create();
        $modifier = new JobStatusModifier($jobStatus);

        $modifier->addException($rawException);

        $exception = $jobStatus->refresh()->exception;
        $this->assertInstanceOf(JobException::class, $exception);

        $this->assertEquals('My exception message', $exception->message);
        $this->assertEquals($rawException->getLine(), $exception->line);
        $this->assertEquals($rawException->getCode(), $exception->code);
        $this->assertEquals($rawException->getFile(), $exception->file);
        $this->assertEquals(json_decode(json_encode($rawException->getTrace()), true), $exception->stack_trace);
        $this->assertNotNull($exception->created_at);
        $this->assertNotNull($exception->updated_at);
        $this->assertNull($exception->previous_id);
    }

    /** @test */
    public function add_exception_adds_an_exception_with_previous()
    {
        $previousException2 = new \Exception('Even more previous exception message', 400, null);
        $previousException = new \Exception('Previous exception message', 400, $previousException2);
        $rawException = new \Exception('My exception message', 502, $previousException);

        $jobStatus = JobStatus::factory()->create();
        $modifier = new JobStatusModifier($jobStatus);

        $modifier->addException($rawException);

        $exception = $jobStatus->refresh()->exception;
        $this->assertInstanceOf(JobException::class, $exception);

        $this->assertEquals('My exception message', $exception->message);
        $this->assertEquals($rawException->getLine(), $exception->line);
        $this->assertEquals($rawException->getCode(), $exception->code);
        $this->assertEquals($rawException->getFile(), $exception->file);
        $this->assertEquals(json_decode(json_encode($rawException->getTrace()), true), $exception->stack_trace);
        $this->assertNotNull($exception->created_at);
        $this->assertNotNull($exception->updated_at);
        $this->assertNotNull($exception->previous_id);

        $exceptionTwo = $exception->previous;
        $this->assertInstanceOf(JobException::class, $exceptionTwo);

        $this->assertEquals('Previous exception message', $exceptionTwo->message);
        $this->assertEquals($previousException->getLine(), $exceptionTwo->line);
        $this->assertEquals($previousException->getCode(), $exceptionTwo->code);
        $this->assertEquals($previousException->getFile(), $exceptionTwo->file);
        $this->assertEquals(json_decode(json_encode($previousException->getTrace()), true), $exceptionTwo->stack_trace);
        $this->assertNotNull($exceptionTwo->created_at);
        $this->assertNotNull($exceptionTwo->updated_at);
        $this->assertNotNull($exceptionTwo->previous_id);


        $exceptionThree = $exceptionTwo->previous;
        $this->assertInstanceOf(JobException::class, $exceptionThree);

        $this->assertEquals('Even more previous exception message', $exceptionThree->message);
        $this->assertEquals($previousException2->getLine(), $exceptionThree->line);
        $this->assertEquals($previousException2->getCode(), $exceptionThree->code);
        $this->assertEquals($previousException2->getFile(), $exceptionThree->file);
        $this->assertEquals(json_decode(json_encode($previousException2->getTrace()), true), $exceptionThree->stack_trace);
        $this->assertNotNull($exceptionThree->created_at);
        $this->assertNotNull($exceptionThree->updated_at);
        $this->assertNull($exceptionThree->previous_id);
    }

    /** @test */
    public function the_uuid_can_be_set()
    {
        $uuidOriginal = Str::uuid();
        $uuidUpdated = Str::uuid();

        $jobStatus = JobStatus::factory()->create(['uuid' => (string) $uuidOriginal]);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setUuid((string) $uuidUpdated);
        $this->assertEquals((string) $uuidUpdated, $jobStatus->refresh()->uuid);
    }

    /** @test */
    public function the_job_id_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['job_id' => 1, 'connection_name' => 'testqueue']);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setJobId(2);
        $this->assertEquals(2, $jobStatus->refresh()->job_id);
        $this->assertEquals('testqueue', $jobStatus->refresh()->connection_name);
    }


    /** @test */
    public function the_connection_name_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['job_id' => 1, 'connection_name' => 'testqueue']);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setConnectionName('testqueue-two');
        $this->assertEquals(1, $jobStatus->refresh()->job_id);
        $this->assertEquals('testqueue-two', $jobStatus->refresh()->connection_name);
    }

    /** @test */
    public function a_percentage_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['percentage' => 0]);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setPercentage(10.5);
        $this->assertEquals(10.5, $jobStatus->refresh()->percentage);
        $modifier->setPercentage(85.2);
        $this->assertEquals(85.2, $jobStatus->refresh()->percentage);
        $modifier->setPercentage(98);
        $this->assertEquals(98.0, $jobStatus->refresh()->percentage);
    }

    /** @test */
    public function a_message_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->message('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::INFO,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function the_message_type_can_be_controlled()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->message('Test 123', \JobStatus\Enums\MessageType::SUCCESS);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::SUCCESS,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function line_sets_an_info_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->line('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::INFO,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function warning_message_sets_a_warning_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->warningMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::WARNING,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function success_message_sets_a_success_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->successMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::SUCCESS,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function info_message_sets_an_info_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->infoMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::INFO,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function debug_message_sets_a_debug_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->debugMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::DEBUG,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function error_message_sets_an_error_message()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->errorMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => \JobStatus\Enums\MessageType::ERROR,
            'job_status_id' => $jobStatus->id,
        ]);
    }

    /** @test */
    public function cancel_sends_a_cancel_signal()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->cancel(['param1' => 'value1']);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals'), [
            'signal' => 'cancel',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1']),
        ]);
    }

    /** @test */
    public function send_signal_sends_a_signal()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->sendSignal('custom-signal', ['param1' => 'value1'], false);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals'), [
            'signal' => 'custom-signal',
            'cancel_job' => false,
            'parameters' => json_encode(['param1' => 'value1']),
        ]);
    }

    /** @test */
    public function cancel_makes_the_signal_cancelable()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->sendSignal('custom-signal', ['param1' => 'value1'], true);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals'), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1']),
        ]);
    }

    /** @test */
    public function a_user_id_can_be_pushed()
    {
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);

        $this->assertFalse(JobStatusUser::where('user_id', 2)->where('job_status_id', $jobStatus->id)->exists());
        $modifier->grantAccessTo(2);
        $this->assertTrue(JobStatusUser::where('user_id', 2)->where('job_status_id', $jobStatus->id)->exists());
    }

    /** @test */
    public function cancel_does_nothing_if_no_job_status_set()
    {
        $modifier = new JobStatusModifier(null);
        $modifier->cancel(['param1' => 'value1']);

        $this->assertDatabaseEmpty(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals'));
    }

    /** @test */
    public function the_payload_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['payload' => ['test']]);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setPayload(['test-two']);
        $this->assertEquals(['test-two'], $jobStatus->refresh()->payload);
    }

    /** @test */
    public function the_queue_can_be_set()
    {
        $jobStatus = JobStatus::factory()->create(['queue' => 'queue-1']);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setQueue('queue-2');
        $this->assertEquals('queue-2', $jobStatus->refresh()->queue);
    }
}
