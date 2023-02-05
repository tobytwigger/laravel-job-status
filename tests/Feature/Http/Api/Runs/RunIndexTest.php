<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use Illuminate\Contracts\Auth\Authenticatable;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class RunIndexTest extends TestCase
{
    /** @test */
    public function it_gets_a_requested_job_run()
    {
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')->create(['alias' => 'mystatus']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));

        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];

        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }

    /** @test */
    public function it_can_get_a_requested_job_run_with_index_less_and_indexed_tags()
    {
        $jobStatus = JobStatus::factory()
            ->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')
            ->has(JobStatusTag::factory()->indexless('keytwo'), 'tags')
            ->create(['alias' => 'mystatus']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['keytwo'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes', 'keytwo'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }

    /** @test */
    public function it_returns_the_job_run_formatted()
    {
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'one', 'value' => 'yes']),
            'tags'
        )->create(['alias' => 'mystatus', 'status' => \JobStatus\Enums\Status::STARTED]);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }

    /** @test */
    public function it_returns_an_empty_array_if_no_job_runs_found()
    {
        $statusQuery = [
            'alias' => 'abc',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));
        $response->assertStatus(200);
        $response->decodeResponseJson()->assertExact([]);
    }

    /** @test */
    public function tags_must_be_an_array_if_given()
    {
        $statusQuery = [
            'alias' => 'MyClass',
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));

        $response->assertStatus(422);
    }

    /** @test */
    public function alias_must_be_given()
    {
        $statusQuery = [
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));

        $response->assertStatus(422);
    }

    /** @test */
    public function alias_must_be_a_string()
    {
        $statusQuery = [
            'alias' => ['my' => 'class'],
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));

        $response->assertStatus(422);
    }


    /** @test */
    public function it_gives_access_to_a_user_with_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }


    /** @test */
    public function it_denies_access_to_a_user_without_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->decodeResponseJson()->assertExact([]);
    }

    /** @test */
    public function it_denies_access_to_an_anonymous_user_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->decodeResponseJson()->assertExact([]);
    }

    /** @test */
    public function it_gives_access_to_a_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);

        $this->prophesizeUserWithId(1);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }

    /** @test */
    public function it_gives_access_to_a_connected_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }


    /** @test */
    public function it_gives_access_to_an_anonymous_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));

        $response->assertOk();
        $response->assertJsonCount(1);
        $result = $response->decodeResponseJson()[0];
        $this->assertEquals($jobStatus->id, $result['id'] ?? null);
        $this->assertEquals($jobStatus->class, $result['class'] ?? null);
        $this->assertEquals($jobStatus->alias, $result['alias'] ?? null);
    }
}
