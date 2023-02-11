<?php

namespace JobStatus\Tests\Feature\Http\Api\Jobs;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class JobIndexTest extends TestCase
{
    /** @test */
    public function it_returns_all_jobs()
    {
        $job1 = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => true])->count(5)->create();
        $job2 = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => true])->count(5)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(2, 'data');

        $this->assertEquals('OurAliasTwo', $response->json('data.0.alias'));
        $this->assertEquals('OurAlias', $response->json('data.1.alias'));
        $response->assertJsonCount(5, 'data.0.runs');
        $response->assertJsonCount(5, 'data.1.runs');
        $this->assertEquals($job2[4]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($job2[3]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($job2[2]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($job2[1]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($job2[0]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($job1[4]->id, $response->json('data.1.runs.0.id'));
        $this->assertEquals($job1[3]->id, $response->json('data.1.runs.1.id'));
        $this->assertEquals($job1[2]->id, $response->json('data.1.runs.2.id'));
        $this->assertEquals($job1[1]->id, $response->json('data.1.runs.3.id'));
        $this->assertEquals($job1[0]->id, $response->json('data.1.runs.4.id'));
    }

    /** @test */
    public function it_returns_only_jobs_that_have_runs_the_user_can_access()
    {
        $inaccessible = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => false])->count(10)->create();
        $accessible = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(10, 'data.0.runs');

        $this->assertEquals('OurAliasTwo', $response->json('data.0.runs.0.alias'));
        $this->assertEquals($accessible[9]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($accessible[8]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($accessible[7]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($accessible[6]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($accessible[5]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($accessible[4]->id, $response->json('data.0.runs.5.id'));
        $this->assertEquals($accessible[3]->id, $response->json('data.0.runs.6.id'));
        $this->assertEquals($accessible[2]->id, $response->json('data.0.runs.7.id'));
        $this->assertEquals($accessible[1]->id, $response->json('data.0.runs.8.id'));
        $this->assertEquals($accessible[0]->id, $response->json('data.0.runs.9.id'));
    }

    /** @test */
    public function it_returns_jobs_for_the_runs_a_user_can_access()
    {
        $job1 = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => true])->count(5)->create();
        $job2 = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => false])->count(5)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(5, 'data.0.runs');
        $this->assertEquals($job1[4]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($job1[3]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($job1[2]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($job1[1]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($job1[0]->id, $response->json('data.0.runs.4.id'));
    }

    /** @test */
    public function it_returns_an_empty_array_for_no_jobs()
    {
        $response = $this->getJson(route('api.job-status.jobs.index'));
        $this->assertEquals([], $response->json('data'));
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $inaccessible = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => false])->count(10)->create();
        $accessible = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));
        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(10, 'data.0.runs');

        $this->assertEquals('OurAliasTwo', $response->json('data.0.runs.0.alias'));
        $this->assertEquals($accessible[9]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($accessible[8]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($accessible[7]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($accessible[6]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($accessible[5]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($accessible[4]->id, $response->json('data.0.runs.5.id'));
        $this->assertEquals($accessible[3]->id, $response->json('data.0.runs.6.id'));
        $this->assertEquals($accessible[2]->id, $response->json('data.0.runs.7.id'));
        $this->assertEquals($accessible[1]->id, $response->json('data.0.runs.8.id'));
        $this->assertEquals($accessible[0]->id, $response->json('data.0.runs.9.id'));

        $response = $this->getJson(route('api.job-status.jobs.index', ['bypassAuth' => true]));

        $response->assertJsonCount(2, 'data');
        $response->assertJsonCount(10, 'data.0.runs');

        $this->assertEquals('OurAliasTwo', $response->json('data.0.runs.0.alias'));
        $this->assertEquals($accessible[9]->id, $response->json('data.0.runs.0.id'));
        $this->assertEquals($accessible[8]->id, $response->json('data.0.runs.1.id'));
        $this->assertEquals($accessible[7]->id, $response->json('data.0.runs.2.id'));
        $this->assertEquals($accessible[6]->id, $response->json('data.0.runs.3.id'));
        $this->assertEquals($accessible[5]->id, $response->json('data.0.runs.4.id'));
        $this->assertEquals($accessible[4]->id, $response->json('data.0.runs.5.id'));
        $this->assertEquals($accessible[3]->id, $response->json('data.0.runs.6.id'));
        $this->assertEquals($accessible[2]->id, $response->json('data.0.runs.7.id'));
        $this->assertEquals($accessible[1]->id, $response->json('data.0.runs.8.id'));
        $this->assertEquals($accessible[0]->id, $response->json('data.0.runs.9.id'));

        $response->assertJsonCount(10, 'data.1.runs');

        $this->assertEquals('OurAlias', $response->json('data.1.runs.0.alias'));
        $this->assertEquals($inaccessible[9]->id, $response->json('data.1.runs.0.id'));
        $this->assertEquals($inaccessible[8]->id, $response->json('data.1.runs.1.id'));
        $this->assertEquals($inaccessible[7]->id, $response->json('data.1.runs.2.id'));
        $this->assertEquals($inaccessible[6]->id, $response->json('data.1.runs.3.id'));
        $this->assertEquals($inaccessible[5]->id, $response->json('data.1.runs.4.id'));
        $this->assertEquals($inaccessible[4]->id, $response->json('data.1.runs.5.id'));
        $this->assertEquals($inaccessible[3]->id, $response->json('data.1.runs.6.id'));
        $this->assertEquals($inaccessible[2]->id, $response->json('data.1.runs.7.id'));
        $this->assertEquals($inaccessible[1]->id, $response->json('data.1.runs.8.id'));
        $this->assertEquals($inaccessible[0]->id, $response->json('data.1.runs.9.id'));
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

        $response = $this->getJson(route('api.job-status.jobs.index', ['bypassAuth' => true]));
        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_paginate()
    {
        $jobStatuses = JobStatus::factory(['is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.jobs.index', ['page' => 1, 'per_page' => 5]));

        $this->assertEquals(1, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(1, $response->json('from'));
        $this->assertEquals(5, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[9]->alias, $response->json('data.0.alias'));
        $this->assertEquals($jobStatuses[8]->alias, $response->json('data.1.alias'));
        $this->assertEquals($jobStatuses[7]->alias, $response->json('data.2.alias'));
        $this->assertEquals($jobStatuses[6]->alias, $response->json('data.3.alias'));
        $this->assertEquals($jobStatuses[5]->alias, $response->json('data.4.alias'));

        $response = $this->getJson(route('api.job-status.jobs.index', ['page' => 2, 'per_page' => 5]));
        $this->assertEquals(2, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(6, $response->json('from'));
        $this->assertEquals(10, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[4]->alias, $response->json('data.0.alias'));
        $this->assertEquals($jobStatuses[3]->alias, $response->json('data.1.alias'));
        $this->assertEquals($jobStatuses[2]->alias, $response->json('data.2.alias'));
        $this->assertEquals($jobStatuses[1]->alias, $response->json('data.3.alias'));
        $this->assertEquals($jobStatuses[0]->alias, $response->json('data.4.alias'));
    }
}
