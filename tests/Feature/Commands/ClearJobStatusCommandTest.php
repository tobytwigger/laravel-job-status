<?php

namespace JobStatus\Tests\Feature\Commands;

use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\TestCase;

class ClearJobStatusCommandTest extends TestCase
{
    /** @test */
    public function it_deletes_the_job_statuses()
    {
        JobStatus::factory()->count(3)->create(['updated_at' => now()->subHour(), 'status' => \JobStatus\Enums\Status::SUCCEEDED]);

        $this->artisan('job-status:clear')
            ->assertOk();

        $this->assertCount(0, JobStatus::all());
    }

    /** @test */
    public function it_only_deletes_old_job_statuses()
    {
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
    public function it_only_deletes_finished_job_statuses()
    {
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
    public function it_deletes_a_job_status_with_all_its_relationships()
    {
        JobStatus::factory()->has(
            JobStatusStatus::factory()->count(3),
            'statuses'
        )->has(
            JobStatusTag::factory()->count(3),
            'tags'
        )->has(
            JobSignal::factory()->count(3),
            'signals'
        )->has(
            JobMessage::factory()->count(3),
            'messages'
        )->has(
            JobException::factory(),
            'exception'
        )->has(
            JobBatch::factory(),
            'exception'
        )->count(3)->create([
            'status' => \JobStatus\Enums\Status::SUCCEEDED,
        ]);

        $this->artisan('job-status:clear')
            ->assertOk();

        $this->assertCount(0, JobStatus::all());
        $this->assertCount(0, JobBatch::all());
        $this->assertCount(0, JobException::all());
        $this->assertCount(0, JobStatusStatus::all());
        $this->assertCount(0, JobStatusTag::all());
        $this->assertCount(0, JobSignal::all());
        $this->assertCount(0, JobMessage::all());
    }

    /** @test */
    public function trim_only_removes_relationships_excluding_exception_and_batch()
    {
        $exception = JobException::factory()->create();
        $batch = JobBatch::factory()->create();

        $jobStatus = JobStatus::factory()->create(['updated_at' => now()->subHours(7), 'status' => Status::SUCCEEDED]);

        JobMessage::factory()->count(5)->create(['job_status_id' => $jobStatus->id]);
        JobSignal::factory()->count(5)->create(['job_status_id' => $jobStatus->id]);
        JobStatusStatus::factory()->count(5)->create(['job_status_id' => $jobStatus->id]);
        JobStatusTag::factory()->count(5)->create(['job_status_id' => $jobStatus->id]);

        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_statuses', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_exceptions', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_batches', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_status_tags', 5);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_messages', 5);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_signals', 5);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_status_statuses', 5);

        $this->artisan('job-status:clear --preserve=2 --trim')
            ->assertOk();

        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_statuses', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_exceptions', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_batches', 1);
        $this->assertDatabaseCount(config('laravel-job-status.table_prefix') . '_job_status_tags', 5);
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_messages');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_signals');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_statuses');
    }

    /** @test */
    public function keep_failed_keeps_all_failed_jobs()
    {
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]);
        $preservedJobs3 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]);
        $preservedJobs1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]);
        $preservedJobs2 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::STARTED]);

        $this->artisan('job-status:clear --keep-failed')
            ->assertOk();

        $this->assertCount(9, JobStatus::all());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs1[2]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs2[2]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs3[0]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs3[1]->id)->exists());
        $this->assertTrue(JobStatus::where('id', $preservedJobs3[2]->id)->exists());
    }

    /** @test */
    public function force_wipes_all_job_status_data()
    {
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]);
        JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]);

        $this->artisan('job-status:clear --force')
            ->assertOk();

        $this->assertCount(0, JobStatus::all());
    }
}
