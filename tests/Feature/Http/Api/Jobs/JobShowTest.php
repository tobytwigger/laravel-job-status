<?php

namespace JobStatus\Tests\Feature\Http\Api\Jobs;

use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class JobShowTest extends TestCase
{

    /** @test */
    public function it_returns_the_requested_job(){
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['public' => false, 'alias' => 'Job 1']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.jobs.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->alias, $result[0]['alias'] ?? null);
    }

    /** @test */
    public function it_returns_a_404_if_the_job_was_not_found(){
        $response = $this->getJson(route('api.job-status.jobs.show', 'some-job'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_only_searches_by_alias(){
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['public' => false, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.jobs.show', 'MyJobClass'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_404_if_the_user_does_not_have_access_to_any_jobs_in_the_job(){
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['public' => false, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.jobs.show', 'MyJobClass'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_404_if_an_anonymous_user_tries_to_get_the_job_without_any_public_jobs_in_the_job(){
        $status = JobStatus::factory()->create(['public' => false, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        $response = $this->getJson(route('api.job-status.jobs.show', 'MyJobClass'));
        $response->assertNotFound();
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_access_to_a_public_run_through_the_job(){
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['public' => true, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        $response = $this->getJson(route('api.job-status.jobs.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->alias, $result[0]['alias'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public_run_through_the_job(){
        $this->prophesizeUserWithId(1);

        $status = JobStatus::factory()->create(['public' => true, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.jobs.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->alias, $result[0]['alias'] ?? null);
    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_run_through_the_job(){
        $status = JobStatus::factory()->create(['public' => true, 'alias' => 'Job 1', 'class' => 'MyJobClass']);

        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);

        $response = $this->getJson(route('api.job-status.jobs.show', 'Job 1'));
        $response->assertOk();
        $result = $response->decodeResponseJson()->json('runs');
        $this->assertnotNull($result);
        $this->assertCount(1, $result);

        $this->assertEquals($status->id, $result[0]['id'] ?? null);
        $this->assertEquals($status->class, $result[0]['class'] ?? null);
        $this->assertEquals($status->alias, $result[0]['alias'] ?? null);
    }

}
