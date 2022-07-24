<?php

namespace JobStatus\Tests\Feature;

use JobStatus\Models\JobStatusStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class TrackableTest extends TestCase
{

    /** @test */
    public function it_creates_a_job_status_on_job_dispatch(){
        $this->assertDatabaseCount(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), 0);

        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'job_class' => JobFake::class,
            'job_alias' => 'my-fake-job'
        ]);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-first-tag', 'value' => '1'
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-second-tag', 'value' => 'mytag-value'
        ]);
    }

    /** @test */
    public function it_changes_the_job_status_to_finished(){
        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'queued'
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'started'
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'succeeded'
        ]);
    }

    /** @test */
    public function it_changes_the_job_status_to_failed(){
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value'
                ],
                callback: fn() => throw new \Exception('Job went wrong')
            ));
        } catch (\Exception $e) {}

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'queued'
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'started'
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'failed'
        ]);
    }

    /** @test */
    public function messages_can_be_sent(){
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value'
                ],
                callback: fn(JobFake $job) => $job->message('This is a test message', 'success')
            ));
        } catch (\Exception $e) {}

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'This is a test message',
            'type' => 'success'
        ]);
    }

    /** @test */
    public function percentages_can_be_updated(){
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value'
                ],
                callback: fn(JobFake $job) => $job->percentage(52.6)
            ));
        } catch (\Exception $e) {}

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'percentage' => 52.6,
        ]);
    }

}
