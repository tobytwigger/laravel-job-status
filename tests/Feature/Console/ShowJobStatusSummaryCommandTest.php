<?php

namespace JobStatus\Tests\Feature\Console;

use Illuminate\Support\Facades\Artisan;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class ShowJobStatusSummaryCommandTest extends TestCase
{

    /** @test */
    public function it_shows_the_right_data_for_one_job_type(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')->create(['job_class' => 'MyFirstJob', 'status' => 'queued']);
        JobStatus::factory()->count(20)->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')->create(['job_class' => 'MyFirstJob', 'status' => 'failed']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')->create(['job_class' => 'MyFirstJob', 'status' => 'started']);


        $response = $this->artisan('job-status:summary')
            ->assertOk()
            ->expectsTable([
                'Job', 'Tags', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'
            ], [
                [
                    'MyFirstJob', 'keyone = valueone', 1, 1, 0, 20, 0
                ]
            ]);
    }

    /** @test */
    public function it_shows_multiple_tags(){
        JobStatus::factory()
            ->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')
            ->has(JobStatusTag::factory()->state(['key' => 'keytwo', 'value' => 'valuetwo']), 'tags')
            ->create(['job_class' => 'MyFirstJob', 'status' => 'queued']);


        $response = $this->artisan('job-status:summary')
            ->assertOk()
            ->expectsTable([
                'Job', 'Tags', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'
            ], [
                [
                    'MyFirstJob', 'keyone = valueone, keytwo = valuetwo', 1, 0, 0, 0, 0
                ]
            ]);
    }

    /** @test */
    public function it_shows_multiple_jobs(){
        JobStatus::factory()
            ->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')
            ->has(JobStatusTag::factory()->state(['key' => 'keytwo', 'value' => 'valuetwo']), 'tags')
            ->create(['job_class' => 'MyFirstJob', 'status' => 'queued']);
        JobStatus::factory()->count(20)->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')->create(['job_class' => 'MyFirstJob', 'status' => 'failed']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'keyone', 'value' => 'valueone']), 'tags')->create(['job_class' => 'MySecondJob', 'status' => 'started']);


        $response = $this->artisan('job-status:summary')
            ->assertOk()
            ->expectsTable([
                'Job', 'Tags', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'
            ], [
                ['MyFirstJob', 'keyone = valueone, keytwo = valuetwo', 1, 0, 0, 0, 0],
                ['MyFirstJob', 'keyone = valueone', 0, 0, 0, 20, 0],
                ['MySecondJob', 'keyone = valueone', 0, 1, 0, 0, 0],
            ]);
    }
}
