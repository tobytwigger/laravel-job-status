<?php

namespace JobStatus\Tests\Feature\Commands;

use Carbon\Carbon;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class ShowJobStatusSummaryCommandTest extends TestCase
{
    /** @test */
    public function it_shows_the_right_data_for_one_job_type()
    {
        JobStatus::factory()->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::QUEUED]);
        JobStatus::factory()->count(20)->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::FAILED]);
        JobStatus::factory()->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::STARTED]);

        $response = $this->artisan('job-status:summary')
            ->assertOk()
            ->expectsTable([
                'Job', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled',
            ], [
                [
                    'MyFirstJob', 1, 1, 0, 20, 0,
                ],
            ]);
    }

    /** @test */
    public function it_shows_multiple_jobs()
    {
        JobStatus::factory()->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::QUEUED, 'created_at' => Carbon::now()->subHour()]);
        JobStatus::factory()->count(20)->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::FAILED, 'created_at' => Carbon::now()->subHour()]);
        JobStatus::factory()->create(['class' => 'MySecondJob', 'alias' => 'my-second-job', 'status' => \JobStatus\Enums\Status::STARTED, 'created_at' => Carbon::now()->subHours(4)]);

        $response = $this->artisan('job-status:summary')
            ->assertOk()
            ->expectsTable([
                'Job', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled',
            ], [
                ['MyFirstJob', 1, 0, 0, 20, 0],
                ['MySecondJob', 0, 1, 0, 0, 0],
            ]);
    }

    /** @test */
    public function it_can_filter_by_class()
    {
        JobStatus::factory()->count(20)->create(['class' => 'MyFirstJob', 'alias' => 'my-first-job', 'status' => \JobStatus\Enums\Status::FAILED]);
        JobStatus::factory()->create(['class' => 'MySecondJob', 'alias' => 'my-second-job', 'status' => \JobStatus\Enums\Status::STARTED]);

        $response = $this->artisan('job-status:summary --class=MySecondJob')
            ->assertOk()
            ->expectsTable([
                'Job', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled',
            ], [
                ['MySecondJob', 0, 1, 0, 0, 0],
            ])
            // Test the table excludes any mention of MyFirstJob
            ->doesntExpectOutputToContain('MyFirstJob');
    }

    /** @test */
    public function it_can_filter_by_alias()
    {
        JobStatus::factory()->count(20)->create(['class' => 'SomeJobOne', 'alias' => 'MyFirstJob', 'status' => \JobStatus\Enums\Status::FAILED]);
        JobStatus::factory()->create(['class' => 'SomeJobTwo', 'alias' => 'MySecondJob', 'status' => \JobStatus\Enums\Status::STARTED]);

        $response = $this->artisan('job-status:summary --alias=MySecondJob')
            ->assertOk()
            ->expectsTable([
                'Job', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled',
            ], [
                ['SomeJobTwo', 0, 1, 0, 0, 0],
            ])
            // Test the table excludes any mention of MyFirstJob
            ->doesntExpectOutputToContain('SomeJobOne');
    }
}
