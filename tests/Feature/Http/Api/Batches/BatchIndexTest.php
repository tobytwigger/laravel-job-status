<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use Illuminate\Support\Facades\Gate;
use Illuminate\Testing\AssertableJsonString;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
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
    public function it_returns_runs_for_the_jobs_a_user_can_access()
    {
        $batch = JobBatch::factory()->create();
        $run3 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subDay()]);
        $run2 = JobStatus::factory()->create(['is_unprotected' => false, 'batch_id' => $batch->id]);
        $run1 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subHour()]);

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(2, 'data.0.runs');
        $this->assertEquals($run1->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($run3->id, $response->json('data.0.runs.1.id'));
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

        $result = new AssertableJsonString(json_encode((new AssertableJsonString($response->decodeResponseJson()->json('data')))[0]['runs']));
        $this->assertEquals('OurAliasTwo', $response->json('data.0.runs.0.alias'));
        $this->assertEquals($accessible->jobStatus[9]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($accessible->jobStatus[8]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($accessible->jobStatus[7]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($accessible->jobStatus[6]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($accessible->jobStatus[5]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($accessible->jobStatus[4]->id, $response->json('data.0.runs.5.id'));
        $this->assertEquals($accessible->jobStatus[3]->id, $response->json('data.0.runs.6.id'));
        $this->assertEquals($accessible->jobStatus[2]->id, $response->json('data.0.runs.7.id'));
        $this->assertEquals($accessible->jobStatus[1]->id, $response->json('data.0.runs.8.id'));
        $this->assertEquals($accessible->jobStatus[0]->id, $response->json('data.0.runs.9.id'));

        $response = $this->getJson(route('api.job-status.batches.index', ['bypassAuth' => true]));
        $response->assertJsonCount(2, 'data');

        $result = new AssertableJsonString(json_encode((new AssertableJsonString($response->decodeResponseJson()->json('data')))[0]['runs']));
        $this->assertEquals('OurAliasTwo', $response->json('data.0.runs.0.alias'));
        $this->assertEquals($accessible->jobStatus[9]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($accessible->jobStatus[8]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($accessible->jobStatus[7]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($accessible->jobStatus[6]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($accessible->jobStatus[5]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($accessible->jobStatus[4]->id, $response->json('data.0.runs.5.id'));
        $this->assertEquals($accessible->jobStatus[3]->id, $response->json('data.0.runs.6.id'));
        $this->assertEquals($accessible->jobStatus[2]->id, $response->json('data.0.runs.7.id'));
        $this->assertEquals($accessible->jobStatus[1]->id, $response->json('data.0.runs.8.id'));
        $this->assertEquals($accessible->jobStatus[0]->id, $response->json('data.0.runs.9.id'));

        $this->assertEquals('OurAlias', $response->json('data.1.runs.0.alias'));
        $this->assertEquals($inaccessible->jobStatus[9]->id, $response->json('data.1.runs.0.id'));
        $this->assertEquals($inaccessible->jobStatus[8]->id, $response->json('data.1.runs.1.id'));
        $this->assertEquals($inaccessible->jobStatus[7]->id, $response->json('data.1.runs.2.id'));
        $this->assertEquals($inaccessible->jobStatus[6]->id, $response->json('data.1.runs.3.id'));
        $this->assertEquals($inaccessible->jobStatus[5]->id, $response->json('data.1.runs.4.id'));
        $this->assertEquals($inaccessible->jobStatus[4]->id, $response->json('data.1.runs.5.id'));
        $this->assertEquals($inaccessible->jobStatus[3]->id, $response->json('data.1.runs.6.id'));
        $this->assertEquals($inaccessible->jobStatus[2]->id, $response->json('data.1.runs.7.id'));
        $this->assertEquals($inaccessible->jobStatus[1]->id, $response->json('data.1.runs.8.id'));
        $this->assertEquals($inaccessible->jobStatus[0]->id, $response->json('data.1.runs.9.id'));

        $result = new AssertableJsonString(json_encode((new AssertableJsonString($response->decodeResponseJson()->json('data')))[1]['runs']));
        $result->assertFragment(['alias' => 'OurAlias']);
        $result->assertFragment(['id' => $inaccessible->jobStatus[0]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[1]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[2]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[3]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[4]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[5]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[6]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[7]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[8]->id]);
        $result->assertFragment(['id' => $inaccessible->jobStatus[9]->id]);
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
    public function it_can_paginate(){
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
}
