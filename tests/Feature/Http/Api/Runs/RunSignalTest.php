<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class RunSignalTest extends TestCase
{
    /** @test */
    public function it_returns_a_404_if_the_model_does_not_exist()
    {
        $response = $this->postJson(route('api.job-status.runs.signal', ['job_status_run' => 5000]), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_sends_a_signal()
    {
        $jobStatus = JobStatus::factory()->create();

        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertOk();

        $this->assertDatabaseHas('job_status_job_signals', [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1']),
        ]);
    }

    /** @test */
    public function it_validates_signal()
    {
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function ($signal) use ($jobStatus) {
            return $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
                'signal' => $signal,
                'cancel_job' => true,
                'parameters' => ['param1' => 'value1'],
            ]);
        };

        $getResponse('my-signal')->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('signal');
        $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'cancel_job' => true, 'parameters' => ['param1' => 'value1'],
        ])->assertJsonValidationErrorFor('signal');
    }

    /** @test */
    public function it_validates_cancel_job()
    {
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function ($cancelJob) use ($jobStatus) {
            return $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => $cancelJob,
                'parameters' => ['param1' => 'value1'],
            ]);
        };

        $getResponse(true)->assertOk();
        $getResponse(false)->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('cancel_job');
        $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'my-signal', 'parameters' => ['param1' => 'value1'],
        ])->assertJsonValidationErrorFor('cancel_job');
    }

    /** @test */
    public function it_validates_parameters()
    {
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function ($parameters) use ($jobStatus) {
            return $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => true,
                'parameters' => $parameters,
            ]);
        };

        $getResponse(['one' => 'two'])->assertOk();
        $getResponse(['one' => 'two', 'three' => 'four'])->assertOk();
        $getResponse([])->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('parameters');
        $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'my-signal', 'cancel_job' => false,
        ])->assertOk();
    }





    /** @test */
    public function it_gives_access_to_a_user_with_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);

        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertOk();
    }


    /** @test */
    public function it_denies_access_to_a_user_without_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);


        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertForbidden();
    }

    /** @test */
    public function it_denies_access_to_an_anonymous_user_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);

        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertForbidden();
    }

    /** @test */
    public function it_gives_access_to_a_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);

        $this->prophesizeUserWithId(1);


        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertOk();
    }

    /** @test */
    public function it_gives_access_to_a_connected_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $this->prophesizeUserWithId(1);


        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertOk();
    }


    /** @test */
    public function it_gives_access_to_an_anonymous_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertOk();
    }


    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default',
            'public' => false,
        ]);

        $response = $this->postJson(route('api.job-status.runs.signal', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertStatus(403);

        $response = $this->postJson(route('api.job-status.runs.signal', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertStatus(200);
    }

    /** @test */
    public function auth_cannot_be_bypassed_if_no_gate_permission()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => false);

        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default',
            'public' => false,
        ]);

        $response = $this->postJson(route('api.job-status.runs.signal', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1'],
        ]);
        $response->assertStatus(403);
    }
}
