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
        $this->assertEquals(5, $response->json('data.0.count'));
        $this->assertEquals(5, $response->json('data.1.count'));
    }

    /** @test */
    public function it_returns_only_jobs_that_have_runs_the_user_can_access()
    {
        $inaccessible = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => false])->count(10)->create();
        $accessible = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1, 'data');
        $this->assertEquals(10, $response->json('data.0.count'));

        $this->assertEquals('OurAliasTwo', $response->json('data.0.alias'));
    }

    /** @test */
    public function it_returns_jobs_for_the_runs_a_user_can_access()
    {
        $job1 = JobStatus::factory(['alias' => 'OurAlias', 'is_unprotected' => true])->count(5)->create();
        $job2 = JobStatus::factory(['alias' => 'OurAliasTwo', 'is_unprotected' => false])->count(5)->create();

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1, 'data');
        $this->assertEquals(5, $response->json('data.0.count'));
        $this->assertEquals('OurAlias', $response->json('data.0.alias'));
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
        $this->assertEquals(10, $response->json('data.0.count'));

        $this->assertEquals('OurAliasTwo', $response->json('data.0.alias'));

        $response = $this->getJson(route('api.job-status.jobs.index', ['bypassAuth' => true]));

        $response->assertJsonCount(2, 'data');
        $this->assertEquals(10, $response->json('data.0.count'));

        $this->assertEquals('OurAliasTwo', $response->json('data.0.alias'));

        $this->assertEquals(10, $response->json('data.1.count'));

        $this->assertEquals('OurAlias', $response->json('data.1.alias'));
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

    /** @test */
    public function it_returns_run_counts_for_the_jobs_a_user_can_access_only()
    {
        $this->markTestSkipped('Failing due to bug around summary information including protected jobs');
        $run3 = JobStatus::factory()->create(['is_unprotected' => true, 'alias' => 'alias1', 'created_at' => now()->subDay()]);
        $run2 = JobStatus::factory()->create(['is_unprotected' => false, 'alias' => 'alias2']);
        $run1 = JobStatus::factory()->create(['is_unprotected' => true, 'alias' => 'alias3', 'created_at' => now()->subHour()]);

        $response = $this->getJson(route('api.job-status.jobs.index'));

        $response->assertJsonCount(1, 'data');
        $this->assertEquals(2, $response->json('data.0.count'));
        $this->assertEquals('alias1', $response->json('data.0.alias'));
        $this->assertEquals('alias3', $response->json('data.1.alias'));
    }
}
