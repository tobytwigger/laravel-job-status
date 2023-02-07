<?php

namespace JobStatus\Tests\Feature\Listeners\Workflow;

use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class DatabaseQueueWithoutTrackableOrInteractsWithQueueTest extends TestCase
{
    /** @test */
    public function a_run_is_handled_without_saving_anything()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value', 'my-indexless-tag'])
            ->setUsers([1, 2])
            ->withoutTrackable()
            ->withoutInteractsWithQueue()
            ->setIsUnprotected(true)
            ->dispatch();

        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_statuses');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_exceptions');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_batches');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_tags');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_messages');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_signals');
        $this->assertDatabaseEmpty(config('laravel-job-status.table_prefix') . '_job_status_statuses');
    }
}
