<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class RunShowTest extends TestCase
{
    /** @test */
    public function it_returns_the_requested_run()
    {
        $jobStatus = JobStatus::factory()->create(['alias' => 'mystatus']);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertOk();
        $result = $response->decodeResponseJson();

        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }

    /** @test */
    public function it_returns_a_404_if_the_run_was_not_found()
    {
        $response = $this->getJson(route('api.job-status.runs.show', ['job_status_run' => 500]));

        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_403_if_the_user_does_not_have_access_to_a_private_job()
    {
        $this->prophesizeUserWithId(1);

        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertForbidden();
    }

    /** @test */
    public function it_returns_a_403_if_an_anonymous_user_tries_to_get_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertForbidden();
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_direct_access_to_a_public()
    {
        $this->prophesizeUserWithId(1);
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertOk();
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('id'),
            $jobStatus->id
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('class'),
            $jobStatus->class
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('alias'),
            $jobStatus->alias
        );
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public()
    {
        $this->prophesizeUserWithId(1);
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertOk();
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('id'),
            $jobStatus->id
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('class'),
            $jobStatus->class
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('alias'),
            $jobStatus->alias
        );
    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertOk();
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('id'),
            $jobStatus->id
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('class'),
            $jobStatus->class
        );
        $this->assertEquals(
            $response->decodeResponseJson()->offsetGet('alias'),
            $jobStatus->alias
        );
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

        $response = $this->getJson(route('api.job-status.runs.show', $jobStatus->id));
        $response->assertStatus(403);

        $response = $this->getJson(route('api.job-status.runs.show', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]));
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

        $response = $this->getJson(route('api.job-status.runs.show', ['job_status_run' => $jobStatus->id, 'bypassAuth' => true]));
        $response->assertStatus(403);
    }
}
