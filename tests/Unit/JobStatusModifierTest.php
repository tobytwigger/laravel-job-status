<?php

namespace JobStatus\Tests\Unit;

use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobStatusModifierTest extends TestCase
{

    /** @test */
    public function the_job_status_can_be_set_and_got(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $this->assertTrue($jobStatus->is($modifier->getJobStatus()));

        $modifier = JobStatusModifier::forJobStatus($jobStatus);
        $this->assertTrue($jobStatus->is($modifier->getJobStatus()));

        $modifier = JobStatusModifier::forJobStatus(null);
        $this->assertNull($modifier->getJobStatus());
    }

    /** @test */
    public function the_status_can_be_set(){
        $jobStatus = JobStatus::factory()->create(['status' => 'queued']);

        $modifier = new JobStatusModifier($jobStatus);

        $modifier->setStatus('started');
        $this->assertEquals('started', $jobStatus->refresh()->status);
        $modifier->setStatus('failed');
        $this->assertEquals('failed', $jobStatus->refresh()->status);
        $modifier->setStatus('cancelled');
        $this->assertEquals('cancelled', $jobStatus->refresh()->status);
    }

    /** @test */
    public function a_percentage_can_be_set(){
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
    public function a_message_can_be_set(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->message('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'info',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function the_message_type_can_be_controlled(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->message('Test 123', 'success');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'success',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function line_sets_an_info_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->line('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'info',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function warningMessage_sets_a_warning_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->warningMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'warning',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function successMessage_sets_a_success_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->successMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'success',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function infoMessage_sets_an_info_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->infoMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'info',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function debugMessage_sets_a_debug_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->debugMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'debug',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function errorMessage_sets_an_error_message(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->errorMessage('Test 123');

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'Test 123',
            'type' => 'error',
            'job_status_id' => $jobStatus->id
        ]);
    }

    /** @test */
    public function cancel_sends_a_cancel_signal(){
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
    public function sendSignal_sends_a_signal(){
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
    public function cancel_makes_the_signal_cancelable(){
        $jobStatus = JobStatus::factory()->create();

        $modifier = new JobStatusModifier($jobStatus);
        $modifier->sendSignal('custom-signal', ['param1' => 'value1'], true);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals'), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1']),
        ]);
    }

}
