<?php

namespace JobStatus\Tests\Feature\Http\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Auth\Authenticatable;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusSearchTest extends TestCase
{
    /** @test */
    public function it_gets_a_requested_job_status()
    {
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')->create(['job_alias' => 'mystatus']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }

    /** @test */
    public function it_returns_the_job_status_formatted()
    {
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'one', 'value' => 'yes']),
            'tags'
        )->create(['job_alias' => 'mystatus', 'status' => \JobStatus\Enums\Status::STARTED]);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }

    /** @test */
    public function it_returns_a_404_if_no_job_statuses_found()
    {
        $statusQuery = [
            'alias' => 'abc',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertStatus(404);
    }

    /** @test */
    public function tags_must_be_an_array_if_given()
    {
        $statusQuery = [
            'alias' => 'MyClass',
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));

        $response->assertStatus(422);
    }

    /** @test */
    public function alias_must_be_given()
    {
        $statusQuery = [
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));

        $response->assertStatus(422);
    }

    /** @test */
    public function alias_must_be_a_string()
    {
        $statusQuery = [
            'alias' => ['my' => 'class'],
            'tags' => 'Wait this is not an array',
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));

        $response->assertStatus(422);
    }


    /** @test */
    public function it_gives_access_to_a_user_with_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);
        $user = $this->prophesize(Authenticatable::class);
        $userRevealed = $user->reveal();
        $userRevealed->id = 1;
        $this->be($userRevealed);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertOk();
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }


    /** @test */
    public function it_denies_access_to_a_user_without_access_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);
        $user = $this->prophesize(Authenticatable::class);
        $userRevealed = $user->reveal();
        $userRevealed->id = 1;
        $this->be($userRevealed);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertNotFound();
    }

    /** @test */
    public function it_denies_access_to_an_anonymous_user_to_the_private_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => false]);
        JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertNotFound();
    }

    /** @test */
    public function it_gives_access_to_a_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);

        $user = $this->prophesize(Authenticatable::class);
        $userRevealed = $user->reveal();
        $userRevealed->id = 1;
        $this->be($userRevealed);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertOk();
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }

    /** @test */
    public function it_gives_access_to_a_connected_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $user = $this->prophesize(Authenticatable::class);
        $userRevealed = $user->reveal();
        $userRevealed->id = 1;
        $this->be($userRevealed);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertOk();
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }


    /** @test */
    public function it_gives_access_to_an_anonymous_user_to_the_public_job()
    {
        $jobStatus = JobStatus::factory()->create(['public' => true]);
        JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $jobStatus->id]);

        $response = $this->getJson(route('job-status.search', ['alias' => $jobStatus->job_alias]));
        $response->assertOk();
        $response->assertJson([
            'id' => $jobStatus->id,
            'class' => $jobStatus->job_class,
            'alias' => $jobStatus->job_alias,
        ]);
    }



}
