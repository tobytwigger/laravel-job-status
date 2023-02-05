<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use Illuminate\Contracts\Auth\Authenticatable;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class BatchIndexTest extends TestCase
{

    /** @test */
    public function it_returns_all_batches(){
        $batches = JobBatch::factory()
            ->has(JobStatus::factory(['public' => true]), 'jobStatus')
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
    public function it_returns_only_batches_that_have_jobs_the_user_can_access(){
        $inaccessible = JobBatch::factory()
            ->has(JobStatus::factory(['public' => false]), 'jobStatus')
            ->count(10)->create();
        $accessible = JobBatch::factory()
            ->has(JobStatus::factory(['public' => true]), 'jobStatus')
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
    public function it_returns_runs_for_the_jobs_a_user_can_access(){
        $batch = JobBatch::factory()->create();
        $run1 = JobStatus::factory()->create(['public' => true, 'batch_id' => $batch->id, 'created_at' => now()->subHour()]);
        $run2 = JobStatus::factory()->create(['public' => false, 'batch_id' => $batch->id]);
        $run3 = JobStatus::factory()->create(['public' => true, 'batch_id' => $batch->id, 'created_at' => now()->subDay()]);

        $response = $this->getJson(route('api.job-status.batches.index'));

        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertArrayHasKey('runs', $result);
        $this->assertCount(2, $result['runs']);
        $this->assertEquals($run1->id, $result['runs'][0]['id']);
        $this->assertEquals($run3->id, $result['runs'][1]['id']);
    }

    /** @test */
    public function it_returns_an_empty_array_for_no_batches(){
        $response = $this->getJson(route('api.job-status.batches.index'));
        $response->decodeResponseJson()->assertExact([]);
    }

}
