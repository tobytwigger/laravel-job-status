<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class RunRetryTest extends TestCase
{
    /** @test */
    public function it_retries_a_matching_job()
    {
        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'faked', 'queue' => 'default',
            'is_unprotected' => true,
        ]);

        $this->assertWillRetryJobStatus($jobStatus);

        $response = $this->postJson(route('api.job-status.runs.retry', $jobStatus->id));
        $response->assertOk();
    }

    /** @test */
    public function it_returns_404_if_the_job_run_was_not_found()
    {
        $response = $this->postJson(route('api.job-status.runs.retry', ['job_status_run' => 500]));
        $this->assertNoJobStatusesRetried();

        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_422_if_the_run_could_not_be_retried()
    {
        $jobStatus = JobStatus::factory()->create([
            'payload' => null, 'connection_name' => 'fake', 'queue' => 'default',
            'is_unprotected' => true,
        ]);

        $this->assertWillFailRetryingJobStatus($jobStatus);

        $response = $this->postJson(route('api.job-status.runs.retry', $jobStatus->id));
        $response->assertStatus(422);
    }

    /** @test */
    public function it_returns_a_403_if_the_user_does_not_have_access_to_the_job_status()
    {
        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default',
            'is_unprotected' => false,
        ]);
        $this->assertNoJobStatusesRetried();

        $response = $this->postJson(route('api.job-status.runs.retry', $jobStatus->id));
        $response->assertStatus(403);
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default',
            'is_unprotected' => false,
        ]);

        $this->assertWillRetryJobStatus($jobStatus);

        $response = $this->postJson(route('api.job-status.runs.retry', $jobStatus->id));
        $response->assertStatus(403);

        $response = $this->postJson(route('api.job-status.runs.retry', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]));
        $response->assertStatus(200);
    }

    /** @test */
    public function auth_cannot_be_bypassed_if_no_gate_permission()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => false);

        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default',
            'is_unprotected' => false,
        ]);

        $this->assertNoJobStatusesRetried();

        $response = $this->postJson(route('api.job-status.runs.retry', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]));
        $response->assertStatus(403);
    }
}
