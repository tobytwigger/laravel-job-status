<?php

namespace JobStatus\Tests\Feature\Http\Api\Queues;

use Illuminate\Support\Facades\Gate;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class QueueIndexTest extends TestCase
{
    /** @test */
    public function it_returns_all_jobs()
    {
        $job1 = JobStatus::factory(['queue' => 'OurQueue', 'is_unprotected' => true])->count(5)->create();
        $job2 = JobStatus::factory(['queue' => 'OurQueueTwo', 'is_unprotected' => true])->count(5)->create();

        $response = $this->getJson(route('api.job-status.queues.index'));

        $response->assertJsonCount(2, 'data');

        $this->assertEquals('OurQueueTwo', $response->json('data.0.name'));
        $this->assertEquals('OurQueue', $response->json('data.1.name'));
        $this->assertEquals(5, $response->json('data.0.count'));
        $this->assertEquals(5, $response->json('data.1.count'));
    }

    /** @test */
    public function it_returns_only_jobs_that_have_runs_the_user_can_access()
    {
        $inaccessible = JobStatus::factory(['queue' => 'OurQueue', 'is_unprotected' => false])->count(10)->create();
        $accessible = JobStatus::factory(['queue' => 'OurQueueTwo', 'is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.queues.index'));

        $response->assertJsonCount(1, 'data');

        $this->assertEquals('OurQueueTwo', $response->json('data.0.name'));
        $this->assertEquals(10, $response->json('data.0.count'));
    }

    /** @test */
    public function it_returns_jobs_for_the_runs_a_user_can_access()
    {
        $job1 = JobStatus::factory(['queue' => 'OurQueue', 'is_unprotected' => true])->count(5)->create();
        $job2 = JobStatus::factory(['queue' => 'OurQueueTwo', 'is_unprotected' => false])->count(5)->create();

        $response = $this->getJson(route('api.job-status.queues.index'));

        $response->assertJsonCount(1, 'data');
        $this->assertEquals('OurQueue', $response->json('data.0.name'));
        $this->assertEquals(5, $response->json('data.0.count'));

    }

    /** @test */
    public function it_returns_an_empty_array_for_no_jobs()
    {
        $response = $this->getJson(route('api.job-status.queues.index'));
        $response->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_gives_access_to_a_private_job_to_a_dashboard_user()
    {
        $this->prophesizeUserWithId(1);
        Gate::define('viewJobStatus', fn ($user) => $user->id === 1);

        $inaccessible = JobStatus::factory(['queue' => 'OurQueue', 'is_unprotected' => false])->count(10)->create();
        $accessible = JobStatus::factory(['queue' => 'OurQueueTwo', 'is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.queues.index', ['bypassAuth' => true]));
        $response->assertJsonCount(2, 'data');

        $this->assertEquals('OurQueueTwo', $response->json('data.0.name'));
        $this->assertEquals('OurQueue', $response->json('data.1.name'));
        $this->assertEquals(10, $response->json('data.0.count'));
        $this->assertEquals(10, $response->json('data.1.count'));
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

        $response = $this->getJson(route('api.job-status.queues.index', ['bypassAuth' => true]));
        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_paginate()
    {
        $jobStatuses = JobStatus::factory(['is_unprotected' => true])->count(10)->create();

        $response = $this->getJson(route('api.job-status.queues.index', ['page' => 1, 'per_page' => 5]));

        $this->assertEquals(1, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(1, $response->json('from'));
        $this->assertEquals(5, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[9]->queue, $response->json('data.0.name'));
        $this->assertEquals($jobStatuses[8]->queue, $response->json('data.1.name'));
        $this->assertEquals($jobStatuses[7]->queue, $response->json('data.2.name'));
        $this->assertEquals($jobStatuses[6]->queue, $response->json('data.3.name'));
        $this->assertEquals($jobStatuses[5]->queue, $response->json('data.4.name'));

        $response = $this->getJson(route('api.job-status.queues.index', ['page' => 2, 'per_page' => 5]));
        $this->assertEquals(2, $response->json('current_page'));
        $this->assertEquals(2, $response->json('last_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(6, $response->json('from'));
        $this->assertEquals(10, $response->json('to'));
        $this->assertEquals(10, $response->json('total'));

        $response->assertJsonCount(5, 'data');
        $this->assertEquals($jobStatuses[4]->queue, $response->json('data.0.name'));
        $this->assertEquals($jobStatuses[3]->queue, $response->json('data.1.name'));
        $this->assertEquals($jobStatuses[2]->queue, $response->json('data.2.name'));
        $this->assertEquals($jobStatuses[1]->queue, $response->json('data.3.name'));
        $this->assertEquals($jobStatuses[0]->queue, $response->json('data.4.name'));
    }
}
