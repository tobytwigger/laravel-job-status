<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use Illuminate\Support\Facades\Gate;
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

        $response->assertJsonCount(1, 'data');

        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
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
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes', 'keytwo'],
        ];
        $response = $this->getJson(route('api.job-status.runs.index', $statusQuery));
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
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
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
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
        $this->assertEquals([], $response->json('data'));
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
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
    }


    /** @test */
    public function it_denies_access_to_a_user_without_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);
        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $this->assertEquals([], $response->json('data'));
    }

    /** @test */
    public function it_denies_access_to_an_anonymous_user_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $this->assertEquals([], $response->json('data'));
    }

    /** @test */
    public function it_gives_access_to_a_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);

        $this->prophesizeUserWithId(1);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
    }

    /** @test */
    public function it_gives_access_to_a_connected_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $this->prophesizeUserWithId(1);


        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));

    }


    /** @test */
    public function it_gives_access_to_an_anonymous_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['is_unprotected' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $jobStatus = JobStatus::factory()->create(['is_unprotected' => false]);

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias]));
        $response->assertOk();
        $this->assertEquals([], $response->json('data'));



        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias, 'bypassAuth' => true]));
        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $this->assertEquals($jobStatus->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatus->class, $response->json('data.0.class'));
        $this->assertEquals($jobStatus->alias, $response->json('data.0.alias'));
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

        $response = $this->getJson(route('api.job-status.runs.index', ['alias' => $jobStatus->alias, 'bypassAuth' => true]));
        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_paginate(){
        $jobStatuses = JobStatus::factory(['is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.runs.index', ['page' => 1, 'per_page' => 5]));

        $this->assertEquals(1, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(1, $response->json('from'));
        $this->assertEquals(5, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[9]->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatuses[8]->id, $response->json('data.1.id'));
        $this->assertEquals($jobStatuses[7]->id, $response->json('data.2.id'));
        $this->assertEquals($jobStatuses[6]->id, $response->json('data.3.id'));
        $this->assertEquals($jobStatuses[5]->id, $response->json('data.4.id'));

        $response = $this->getJson(route('api.job-status.runs.index', ['page' => 2, 'per_page' => 5]));
        $this->assertEquals(2, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(6, $response->json('from'));
        $this->assertEquals(10, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[4]->id, $response->json('data.0.id'));
        $this->assertEquals($jobStatuses[3]->id, $response->json('data.1.id'));
        $this->assertEquals($jobStatuses[2]->id, $response->json('data.2.id'));
        $this->assertEquals($jobStatuses[1]->id, $response->json('data.3.id'));
        $this->assertEquals($jobStatuses[0]->id, $response->json('data.4.id'));
    }
}
