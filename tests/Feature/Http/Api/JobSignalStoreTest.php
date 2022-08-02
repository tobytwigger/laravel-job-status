<?php

namespace JobStatus\Tests\Feature\Http\Api;

use Illuminate\Foundation\Console\RouteListCommand;
use Illuminate\Routing\RouteCollection;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Artisan;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobSignalStoreTest extends TestCase
{

    /** @test */
    public function it_returns_a_404_if_the_model_does_not_exist(){
        $response = $this->postJson(route('job-status.job-signal.store', ['job_status' => 5000]), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_sends_a_signal(){
        $jobStatus = JobStatus::factory()->create();

        $response = $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $response->assertOk();

        $this->assertDatabaseHas('job_status_job_signals', [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1'])
        ]);
    }

    /** @test */
    public function it_validates_signal(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($signal) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => $signal,
                'cancel_job' => true,
                'parameters' => ['param1' => 'value1']
            ]);
        };

        $getResponse('my-signal')->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('signal');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'cancel_job' => true, 'parameters' => ['param1' => 'value1']
        ])->assertJsonValidationErrorFor('signal');
    }

    /** @test */
    public function it_validates_cancel_job(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($cancelJob) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => $cancelJob,
                'parameters' => ['param1' => 'value1']
            ]);
        };

        $getResponse(true)->assertOk();
        $getResponse(false)->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('cancel_job');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'my-signal', 'parameters' => ['param1' => 'value1']
        ])->assertJsonValidationErrorFor('cancel_job');
    }

    /** @test */
    public function it_validates_parameters(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($parameters) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => true,
                'parameters' => $parameters
            ]);
        };

        $getResponse(['one' => 'two'])->assertOk();
        $getResponse(['one' => 'two', 'three' => 'four'])->assertOk();
        $getResponse([])->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('parameters');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'my-signal', 'cancel_job' => false
        ])->assertOk();
    }

}
