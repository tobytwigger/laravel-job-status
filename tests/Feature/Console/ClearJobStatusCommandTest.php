<?php

namespace JobStatus\Tests\Feature\Console;

use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class ClearJobStatusCommandTest extends TestCase
{

    /** @test */
    public function it_deletes_the_job_statuses(){

        JobStatus::factory()->count(3)->create(['updated_at' => now()->subHour(), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);

        $this->artisan('job-status:clear')
            ->assertOk();

        $this->assertCount(0, JobStatus::all());
    }

    /** @test */
    public function it_only_deletes_old_job_statuses(){

        $preservedJobs1 = JobStatus::factory()->count(3)->create(['updated_at' => now()->subHour(), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);
        $preservedJobs2 = JobStatus::factory()->count(3)->create(['updated_at' => now()->subHours(2)->addMinutes(20), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);
        JobStatus::factory()->count(3)->create(['updated_at' => now()->subHours(4), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);
        JobStatus::factory()->count(3)->create(['updated_at' => now()->subHours(7), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);

        $this->artisan('job-status:clear --preserve=2')
            ->assertOk();

        $this->assertCount(6, JobStatus::all());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[2]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[2]->id)->exists());
        $this->assertCount(6, JobStatus::all());
    }

    /** @test */
    public function it_only_deletes_finished_job_statuses(){

        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]);
        $preservedJobs1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]);
        $preservedJobs2 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::STARTED]);

        $this->artisan('job-status:clear')
            ->assertOk();

        $this->assertCount(6, JobStatus::all());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[2]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[2]->id)->exists());
        $this->assertCount(6, JobStatus::all());
    }

    /** @test */
    public function it_deletes_a_job_status_with_all_its_relationships(){
        JobStatus::factory()->has(
            JobStatusStatus::factory()->count(3), 'statuses'
        )->has(
            JobStatusTag::factory()->count(3), 'tags'
        )->has(
            JobSignal::factory()->count(3), 'signals'
        )->has(
            JobMessage::factory()->count(3), 'messages'
        )->count(3)->create([
            'status' => \JobStatus\Enums\Status::SUCCEEDED
        ]);

        $this->artisan('job-status:clear')
            ->assertOk();

        $this->assertCount(0, JobStatus::all());
        $this->assertCount(0, JobStatusStatus::all());
        $this->assertCount(0, JobStatusTag::all());
        $this->assertCount(0, JobSignal::all());
        $this->assertCount(0, JobMessage::all());
    }

}
