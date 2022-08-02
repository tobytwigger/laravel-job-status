<?php

namespace JobStatus\Tests\Feature\Http\Api;

use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class JobStatusIndexTest extends TestCase
{

    /** @test */
    public function it_gets_a_requested_job_status(){
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')->create(['job_alias' => 'mystatus']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'alias' => 'mystatus',
            'tags' => ['one' => 'yes']
        ];
        $response = $this->getJson(route('job-status.index', $statusQuery));

        $response->assertJson([$jobStatus->toArray()]);
    }

    /** @test */
    public function it_can_use_the_job_class_as_a_query(){
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory(['key' => 'one', 'value' => 'yes']), 'tags')->create(['job_class' => 'MyClass']);
        JobStatus::factory()->count(10)->create();

        $statusQuery = [
            'class' => 'MyClass',
            'tags' => ['one' => 'yes']
        ];
        $response = $this->getJson(route('job-status.index', $statusQuery));

        $response->assertJson([$jobStatus->toArray()]);
    }

    /** @test */
    public function it_returns_an_empty_array_if_no_job_statuses_found(){
        $statusQuery = [
            'class' => 'MyClass',
            'tags' => ['one' => 'yes']
        ];
        $response = $this->getJson(route('job-status.index', $statusQuery));

        $response->assertJson([]);
    }

    /** @test */
    public function tags_must_be_an_array_if_given() {
        $statusQuery = [
            'class' => 'MyClass',
            'tags' => 'Wait this is not an array'
        ];
        $response = $this->getJson(route('job-status.index', $statusQuery));

        $response->assertStatus(422);
    }

}
