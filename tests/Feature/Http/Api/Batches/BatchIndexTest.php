<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use Illuminate\Support\Facades\Gate;
use Illuminate\Testing\AssertableJsonString;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class BatchIndexTest extends TestCase
{
    /** @test */
    public function it_returns_all_batches()
    {
        $batches = JobBatch::factory()
            ->has(JobStatus::factory(['is_unprotected' => true]), 'jobStatus')
            ->count(10)->create();

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(10, 'data');

        $this->assertEquals($batches[9]->id, $response->json('data.0.id'));
        $this->assertEquals($batches[8]->id, $response->json('data.1.id'));
        $this->assertEquals($batches[7]->id, $response->json('data.2.id'));
        $this->assertEquals($batches[6]->id, $response->json('data.3.id'));
        $this->assertEquals($batches[5]->id, $response->json('data.4.id'));
        $this->assertEquals($batches[4]->id, $response->json('data.5.id'));
        $this->assertEquals($batches[3]->id, $response->json('data.6.id'));
        $this->assertEquals($batches[2]->id, $response->json('data.7.id'));
        $this->assertEquals($batches[1]->id, $response->json('data.8.id'));
        $this->assertEquals($batches[0]->id, $response->json('data.9.id'));
    }

    /** @test */
    public function it_returns_only_batches_that_have_jobs_the_user_can_access()
    {
        $inaccessible = JobBatch::factory()
            ->has(JobStatus::factory(['is_unprotected' => false]), 'jobStatus')
            ->count(10)->create();
        $accessible = JobBatch::factory()
            ->has(JobStatus::factory(['is_unprotected' => true]), 'jobStatus')
            ->count(10)->create();

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(10, 'data');

        $this->assertEquals($accessible[9]->id, $response->json('data.0.id'));
        $this->assertEquals($accessible[8]->id, $response->json('data.1.id'));
        $this->assertEquals($accessible[7]->id, $response->json('data.2.id'));
        $this->assertEquals($accessible[6]->id, $response->json('data.3.id'));
        $this->assertEquals($accessible[5]->id, $response->json('data.4.id'));
        $this->assertEquals($accessible[4]->id, $response->json('data.5.id'));
        $this->assertEquals($accessible[3]->id, $response->json('data.6.id'));
        $this->assertEquals($accessible[2]->id, $response->json('data.7.id'));
        $this->assertEquals($accessible[1]->id, $response->json('data.8.id'));
        $this->assertEquals($accessible[0]->id, $response->json('data.9.id'));
    }

    /** @test */
    public function it_returns_run_counts_for_the_jobs_a_user_can_access_only()
    {
        $this->markTestSkipped('Failing due to bug around summary information including protected jobs');
        $batch = JobBatch::factory()->create();
        $run3 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subDay()]);
        $run2 = JobStatus::factory()->create(['is_unprotected' => false, 'batch_id' => $batch->id]);
        $run1 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subHour()]);

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(1, 'data');
        $this->assertEquals(2, $response->json('data.0.count'));
    }

    /** @test */
    public function it_returns_an_empty_array_for_no_batches()
    {
        $response = $this->getJson(route('api.job-status.batches.index'));
        (new AssertableJsonString($response->decodeResponseJson()->json('data')))->assertExact([]);
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $inaccessible = JobBatch::factory()
            ->has(JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => false])->count(10), 'jobStatus')
            ->create();
        $accessible = JobBatch::factory()
            ->has(JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => true])->count(10), 'jobStatus')
            ->create();

        $response = $this->getJson(route('api.job-status.batches.index'));
        $response->assertJsonCount(1, 'data');

        $this->assertEquals(10, $response->json('data.0.count'));
        $this->assertEquals($accessible->id, $response->json('data.0.id'));

        $response = $this->getJson(route('api.job-status.batches.index', ['bypassAuth' => true]));
        $response->assertJsonCount(2, 'data');

        $this->assertEquals(10, $response->json('data.0.count'));
        $this->assertEquals(10, $response->json('data.1.count'));
        $this->assertEquals($accessible->id, $response->json('data.0.id'));
        $this->assertEquals($inaccessible->id, $response->json('data.1.id'));
    }

    /** @test */
    public function auth_cannot_be_bypassed_if_no_gate_permission()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => false);

        $batch = JobBatch::factory()->create();
        $jobStatus = JobStatus::factory()->create([
            'payload' => ['test'], 'connection_name' => 'fake', 'queue' => 'default', 'batch_id' => $batch->id,
            'is_unprotected' => false,
        ]);

        $response = $this->getJson(route('api.job-status.batches.index', ['bypassAuth' => true]));
        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_paginate()
    {
        $batches = JobBatch::factory()
            ->has(JobStatus::factory(['is_unprotected' => true]), 'jobStatus')
            ->count(10)->create();


        $response = $this->getJson(route('api.job-status.batches.index', ['page' => 1, 'per_page' => 5]));
        $this->assertEquals(1, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(1, $response->json('from'));
        $this->assertEquals(5, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($batches[9]->id, $response->json('data.0.id'));
        $this->assertEquals($batches[8]->id, $response->json('data.1.id'));
        $this->assertEquals($batches[7]->id, $response->json('data.2.id'));
        $this->assertEquals($batches[6]->id, $response->json('data.3.id'));
        $this->assertEquals($batches[5]->id, $response->json('data.4.id'));

        $response = $this->getJson(route('api.job-status.batches.index', ['page' => 2, 'per_page' => 5]));
        $this->assertEquals(2, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(6, $response->json('from'));
        $this->assertEquals(10, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($batches[4]->id, $response->json('data.0.id'));
        $this->assertEquals($batches[3]->id, $response->json('data.1.id'));
        $this->assertEquals($batches[2]->id, $response->json('data.2.id'));
        $this->assertEquals($batches[1]->id, $response->json('data.3.id'));
        $this->assertEquals($batches[0]->id, $response->json('data.4.id'));
    }

    /** @test */
    public function it_returns_the_full_dataset(){
        $batch = JobBatch::factory()->create();

        JobStatus::factory(['batch_id' => $batch->id, 'is_unprotected' => true, 'status' => Status::QUEUED])->count(5)->create();
        JobStatus::factory(['batch_id' => $batch->id, 'is_unprotected' => true, 'status' => Status::SUCCEEDED])->count(4)->create();
        JobStatus::factory(['batch_id' => $batch->id, 'is_unprotected' => true, 'status' => Status::CANCELLED])->count(2)->create();

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(1, 'data');

        $this->assertEquals([
            'count' => 11,
            'name' => $batch->name,
            'batch_id' => $batch->batch_id,
            'queued' => 5,
            'started' => 0,
            'failed' => 0,
            'succeeded' => 4,
            'cancelled' => 2,
            'created_at' => $batch->created_at->toIsoString(),
            'id' => $batch->id,
        ], $response->json('data.0'));
    }
}
