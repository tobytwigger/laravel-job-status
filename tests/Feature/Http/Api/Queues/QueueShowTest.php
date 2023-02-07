<?php

namespace JobStatus\Tests\Feature\Http\Api\Queues;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class QueueShowTest extends TestCase
{
    /** @test */
    public function it_returns_the_requested_job()
    {
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['is_unprotected' => false, 'queue' => 'Job 1']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->queue, $result[0]['queue'] ?? null);
    }

    /** @test */
    public function it_returns_a_404_if_the_job_was_not_found()
    {
        $response = $this->getJson(route('api.job-status.queues.show', 'some-job'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_only_searches_by_queue()
    {
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['is_unprotected' => false, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.queues.show', 'MyJobClass'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_404_if_the_user_does_not_have_access_to_any_jobs_in_the_job()
    {
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['is_unprotected' => false, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_404_if_an_anonymous_user_tries_to_get_the_job_without_any_public_jobs_in_the_job()
    {
        $status = JobStatus::factory()->create(['is_unprotected' => false, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_access_to_a_public_run_through_the_job()
    {
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['is_unprotected' => true, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->queue, $result[0]['queue'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public_run_through_the_job()
    {
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['is_unprotected' => true, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->queue, $result[0]['queue'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_run_through_the_job()
    {
        $status = JobStatus::factory()->create(['is_unprotected' => true, 'queue' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->queue, $result[0]['queue'] ?? null);
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default', 'queue' => 'Job 1',
            'is_unprotected' => false,
        ]);

        $response = $this->getJson(route('api.job-status.queues.show', 'Job 1'));
        $response->assertStatus(404);

        $response = $this->getJson(route('api.job-status.queues.show', ['job_status_queue' => 'Job 1', 'bypassAuth' => true]));
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

        $response = $this->getJson(route('api.job-status.queues.show', ['job_status_queue' => 'default', 'bypassAuth' => true]));
        $response->assertStatus(403);
    }
}
