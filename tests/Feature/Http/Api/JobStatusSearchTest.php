<?php

namespace JobStatus\Tests\Feature\Http\Api;

use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class JobStatusSearchTest extends TestCase
{

    /** @test */
    public function it_gets_a_requested_job_status(){
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')->create(['job_alias' => 'mystatus']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes']
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertJson($jobStatus->only(['id', 'job_class', 'job_alias']));
    }

    /** @test */
    public function it_returns_a_404_if_no_job_statuses_found(){
        $statusQuery = [
            'alias' => 'abc',
            'tags' => ['one' => 'yes']
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));
        $response->assertStatus(404);
    }

    /** @test */
    public function tags_must_be_an_array_if_given() {
        $statusQuery = [
            'class' => 'MyClass',
            'tags' => 'Wait this is not an array'
        ];
        $response = $this->getJson(route('job-status.search', $statusQuery));

        $response->assertStatus(422);
    }

}
