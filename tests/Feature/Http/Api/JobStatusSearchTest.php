<?php

namespace JobStatus\Tests\Feature\Http\Api;

use Illuminate\Auth\Access\AuthorizationException;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
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
        $response->assertJson($jobStatus->only(['id', 'job_class', 'job_alias']));
    }

    /** @test */
    public function it_returns_the_job_status_formatted()
    {
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'one', 'value' => 'yes']),
            'tags'
        )->create(['job_alias' => 'mystatus', 'status' => 'started']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes'],
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertJson([
            'id' => $jobStatus->id,
            'job_class' => $jobStatus->job_class,
            'job_alias' => $jobStatus->job_alias,
            'percentage' => $jobStatus->percentage,
            'status' => $jobStatus->status,
            'created_at' => $jobStatus->created_at->format('Y-m-d H:i:s'),
            'lastMessage' => $jobStatus->last_message,
            'isFinished' => $jobStatus->isFinished(),
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
    public function it_throws_an_exception_if_the_user_does_not_have_access_to_see_the_tracking()
    {
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'tag1', 'value' => 'val1']),
            'tags'
        )->create(['job_class' => JobFake::class, 'job_alias' => 'my-test-job']);

        JobFake::$canSeeTracking = fn ($user, $tags) => false;

        $response = $this->getJson(route('job-status.search', [
            'alias' => 'my-test-job',
            'tags' => ['tag1' => 'val1'],
        ]));

        $this->assertInstanceOf(AuthorizationException::class, $response->exception);
        $this->assertEquals('You cannot access this job status', $response->exception->getMessage());

        $response->assertStatus(403);
    }

    /** @test */
    public function it_throws_an_exception_if_the_job_class_is_not_real()
    {
        $jobStatus = JobStatus::factory()->create(['job_class' => 'NotAClass', 'job_alias' => 'my-test-job']);

        $response = $this->getJson(route('job-status.search', [
            'alias' => 'my-test-job',
            'tags' => [],
        ]));

        $this->assertInstanceOf(\Exception::class, $response->exception);
        $this->assertEquals('No job of type NotAClass found.', $response->exception->getMessage());

        $response->assertStatus(500);
    }

    /** @test */
    public function it_throws_an_exception_if_the_job_class_exists_but_does_not_extend_trackable()
    {
        $jobStatus = JobStatus::factory()->create(['job_class' => TestCase::class, 'job_alias' => 'my-test-job']);

        $response = $this->getJson(route('job-status.search', [
            'alias' => 'my-test-job',
            'tags' => [],
        ]));

        $this->assertInstanceOf(\Exception::class, $response->exception);
        $this->assertEquals('Job JobStatus\Tests\TestCase is not trackable.', $response->exception->getMessage());

        $response->assertStatus(500);
    }
}
