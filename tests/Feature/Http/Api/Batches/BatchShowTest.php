<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class BatchShowTest extends TestCase
{

    /** @test */
    public function it_returns_the_requested_batch(){
        $this->prophesizeUserWithId(1);

        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => false, 'batch_id' => $batch->id]);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertOk();
        $result = $response->decodeResponseJson();

        $this->assertEquals($batch->id, $result['id'] ?? null);
        $this->assertEquals($batch->batch_id, $result['batch_id'] ?? null);
        $this->assertEquals($batch->name, $result['name'] ?? null);
    }

    /** @test */
    public function it_returns_a_404_if_the_batch_was_not_found(){
        $response = $this->getJson(route('api.job-status.batches.show', 5000));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_403_if_the_user_does_not_have_access_to_any_jobs_in_the_batch(){
        $this->prophesizeUserWithId(1);

        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => false, 'batch_id' => $batch->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertForbidden();
    }

    /** @test */
    public function it_returns_a_403_if_an_anonymous_user_tries_to_get_the_batch_without_any_public_jobs_in_the_batch(){
        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => false, 'batch_id' => $batch->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertForbidden();
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_access_to_a_public_job_through_the_batch(){
        $this->prophesizeUserWithId(1);

        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => true, 'batch_id' => $batch->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertOk();
        $result = $response->decodeResponseJson();

        $this->assertEquals($batch->id, $result['id'] ?? null);
        $this->assertEquals($batch->batch_id, $result['batch_id'] ?? null);
        $this->assertEquals($batch->name, $result['name'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public_job_through_the_batch(){
        $this->prophesizeUserWithId(1);

        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => true, 'batch_id' => $batch->id]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertOk();
        $result = $response->decodeResponseJson();

        $this->assertEquals($batch->id, $result['id'] ?? null);
        $this->assertEquals($batch->batch_id, $result['batch_id'] ?? null);
        $this->assertEquals($batch->name, $result['name'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_job_through_the_batch(){
        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['public' => true, 'batch_id' => $batch->id]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.batches.show', $batch->id));
        $response->assertOk();
        $result = $response->decodeResponseJson();

        $this->assertEquals($batch->id, $result['id'] ?? null);
        $this->assertEquals($batch->batch_id, $result['batch_id'] ?? null);
        $this->assertEquals($batch->name, $result['name'] ?? null);
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn($user) => $user->id === 1);

        $batch = JobBatch::factory()->create();
        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default', 'batch_id' => $batch->id,
            'public' => false
        ]);

        $response = $this->getJson(route('api.job-status.batches.show', 'Job 1'));
        $response->assertStatus(404);

        $response = $this->getJson(route('api.job-status.batches.show', ['job_status_batch' => $batch->id, 'bypassAuth' => true]));
        $response->assertStatus(200);
    }

    /** @test */
    public function auth_cannot_be_bypassed_if_no_gate_permission(){
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn($user) => false);

        $batch = JobBatch::factory()->create();
        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default', 'batch_id' => $batch->id,
            'public' => false
        ]);

        $response = $this->getJson(route('api.job-status.batches.show', ['job_status_batch' => $batch->id, 'bypassAuth' => true]));
        $response->assertStatus(403);
    }

}
