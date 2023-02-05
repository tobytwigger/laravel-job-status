<?php

namespace JobStatus\Tests\Feature\Http\Api\Jobs;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Testing\AssertableJsonString;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class JobIndexTest extends TestCase
{

    /** @test */
    public function it_returns_all_jobs(){
        $job1 = JobStatus::factory(['alias' => 'OurAlias', 'public' => true])->count(5)->create();
        $job2 = JobStatus::factory(['alias' => 'OurAliasTwo', 'public' => true])->count(5)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(2);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[0]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[1]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[2]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[3]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[4]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job2[0]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job2[1]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job2[2]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job2[3]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job2[4]->id]);
    }

    /** @test */
    public function it_returns_only_jobs_that_have_runs_the_user_can_access(){
        $inaccessible = JobBatch::factory()
            ->has(JobStatus::factory(['alias' => 'OurAlias', 'public' => false]), 'jobStatus')
            ->count(10)->create();
        $accessible = JobBatch::factory()
            ->has(JobStatus::factory(['alias' => 'OurAliasTwo', 'public' => true]), 'jobStatus')
            ->count(10)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1);
        $result = new AssertableJsonString(json_encode($response->decodeResponseJson()[0]));

        $result->assertFragment(['alias' => 'OurAliasTwo']);
        $result->assertFragment(['id' => $accessible[0]->id]);
        $result->assertFragment(['id' => $accessible[1]->id]);
        $result->assertFragment(['id' => $accessible[2]->id]);
        $result->assertFragment(['id' => $accessible[3]->id]);
        $result->assertFragment(['id' => $accessible[4]->id]);
        $result->assertFragment(['id' => $accessible[5]->id]);
        $result->assertFragment(['id' => $accessible[6]->id]);
        $result->assertFragment(['id' => $accessible[7]->id]);
        $result->assertFragment(['id' => $accessible[8]->id]);
        $result->assertFragment(['id' => $accessible[9]->id]);

        $result->assertMissing(['alias' => 'OurAlias']);
        $result->assertMissing(['id' => $inaccessible[0]->id]);
        $result->assertMissing(['id' => $inaccessible[1]->id]);
        $result->assertMissing(['id' => $inaccessible[2]->id]);
        $result->assertMissing(['id' => $inaccessible[3]->id]);
        $result->assertMissing(['id' => $inaccessible[4]->id]);
        $result->assertMissing(['id' => $inaccessible[5]->id]);
        $result->assertMissing(['id' => $inaccessible[6]->id]);
        $result->assertMissing(['id' => $inaccessible[7]->id]);
        $result->assertMissing(['id' => $inaccessible[8]->id]);
        $result->assertMissing(['id' => $inaccessible[9]->id]);
    }

    /** @test */
    public function it_returns_jobs_for_the_runs_a_user_can_access(){
        $job1 = JobStatus::factory(['alias' => 'OurAlias', 'public' => true])->count(5)->create();
        $job2 = JobStatus::factory(['alias' => 'OurAliasTwo', 'public' => false])->count(5)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[0]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[1]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[2]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[3]->id]);
        $response->decodeResponseJson()->assertFragment(['id' => $job1[4]->id]);
        $response->decodeResponseJson()->assertMissing(['alias' => 'OurAliasTwo']);
    }

    /** @test */
    public function it_returns_an_empty_array_for_no_jobs(){
        $response = $this->getJson(route('api.job-status.jobs.index'));
        $response->decodeResponseJson()->assertExact([]);
    }

}
