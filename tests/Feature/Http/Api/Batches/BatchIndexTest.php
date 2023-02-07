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

        $response->assertJsonCount(10);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[0]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[1]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[2]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[3]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[4]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[5]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[6]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[7]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[8]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $batches[9]->id]);
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

        $response->assertJsonCount(10);

        $response->decodeResponseJson()->assertFragment(['id' => $accessible[0]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[1]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[2]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[3]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[4]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[5]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[6]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[7]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[8]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $accessible[9]->id]);

        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[0]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[1]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[2]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[3]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[4]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[5]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[6]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[7]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[8]->id]);
        $response->decodeResponseJson()->assertMissing(['id' => $inaccessible[9]->id]);
    }

    /** @test */
    public function it_returns_runs_for_the_jobs_a_user_can_access()
    {
        $batch = JobBatch::factory()->create();
        $run1 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subHour()]);
        $run2 = JobStatus::factory()->create(['is_unprotected' => false, 'batch_id' => $batch->id]);
        $run3 = JobStatus::factory()->create(['is_unprotected' => true, 'batch_id' => $batch->id, 'created_at' => now()->subDay()]);

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertArrayHasKey('runs', $result);
        $this->assertCount(2, $result['runs']);
        $this->assertEquals($run1->id, $result['runs'][0]['id']);
        $this->assertEquals($run3->id, $result['runs'][1]['id']);
    }

    /** @test */
    public function it_returns_an_empty_array_for_no_batches()
    {
        $response = $this->getJson(route('api.job-status.batches.index'));
        $response->decodeResponseJson()->assertExact([]);
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
        $response->assertJsonCount(1);
        $result = new AssertableJsonString(json_encode($response->decodeResponseJson()[0]['runs']));
        $result->assertFragment(['alias' => 'OurAliasTwo']);
        $result->assertFragment(['id' => $accessible->jobStatus[0]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[1]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[2]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[3]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[4]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[5]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[6]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[7]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[8]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[9]->id]);

        $result->assertMissing(['alias' => 'OurAlias']);
        $result->assertMissing(['id' => $inaccessible->jobStatus[0]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[1]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[2]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[3]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[4]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[5]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[6]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[7]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[8]->id]);
        $result->assertMissing(['id' => $inaccessible->jobStatus[9]->id]);

        $response = $this->getJson(route('api.job-status.batches.index', ['bypassAuth' => true]));
        $response->assertJsonCount(2);
        $result = new AssertableJsonString(json_encode($response->decodeResponseJson()[0]['runs']));
        $result->assertFragment(['alias' => 'OurAliasTwo']);
        $result->assertFragment(['id' => $accessible->jobStatus[0]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[1]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[2]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[3]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[4]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[5]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[6]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[7]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[8]->id]);
        $result->assertFragment(['id' => $accessible->jobStatus[9]->id]);

        $result = new AssertableJsonString(json_encode($response->decodeResponseJson()[1]['runs']));
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
}
