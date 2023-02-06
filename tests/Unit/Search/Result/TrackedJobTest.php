<?php

namespace JobStatus\Tests\Unit\Search\Result;

use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class TrackedJobTest extends TestCase
{
    /** @test */
    public function runs_returns_the_runs()
    {
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());
        $runs = collect([
            $run1, $run2, $run3,
        ]);

        $job = new TrackedJob('JobClass', $runs, 'job-alias');
        $this->assertEquals($runs, $job->runs());
    }

    /** @test */
    public function alias_returns_the_alias()
    {
        $job = new TrackedJob('JobClass', collect(), 'job-alias');
        $this->assertEquals('job-alias', $job->alias());
    }

    /** @test */
    public function class_returns_the_alias()
    {
        $job = new TrackedJob('JobClass', collect(), 'job-alias');
        $this->assertEquals('JobClass', $job->jobClass());
    }

    /** @test */
    public function latest_returns_the_latest_run()
    {
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $job = new TrackedJob('JobClass', collect([
            $run1, $run2, $run3,
        ]), 'job-alias');
        $this->assertEquals($run1, $job->latest());
    }

    /** @test */
    public function number_of_runs_returns_the_number_of_runs()
    {
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $job = new TrackedJob('JobClass', collect([
            $run1, $run2, $run3,
        ]), 'job-alias');
        $this->assertEquals(3, $job->numberOfRuns());
    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json()
    {
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $runs = collect([$run1, $run2, $run3]);

        $job = new TrackedJob('JobClass', $runs, 'job-alias');

        $array = [
            'count' => 3,
            'alias' => 'job-alias',
            'class' => 'JobClass',
            'runs' => $runs->toArray(),
        ];
        $this->assertEquals($array, $job->toArray());
        $this->assertEquals(json_encode($array), $job->toJson());
    }

    /** @test */
    public function getFailureReasons_gets_all_failure_reasons_from_run_exceptions(){
        $exception1 = JobException::factory(['message' => 'Test One'])->create();
        $exception2 = JobException::factory(['message' => 'Test Two'])->create();
        $run1 = new JobRun(JobStatus::factory()->create(['exception_id' => $exception1->id, 'alias' => 'alias1', 'status' => Status::FAILED, 'created_at' => now()->subHour()]));
        $run2 = new JobRun(JobStatus::factory()->create(['exception_id' => $exception2->id, 'alias' => 'alias1', 'status' => Status::FAILED, 'created_at' => now()->subHours(2)]));
        $run3 = new JobRun(JobStatus::factory()->create(['exception_id' => $exception1->id, 'alias' => 'alias2', 'status' => Status::FAILED, 'created_at' => now()->subHours(3)]));

        $runs = new JobRunCollection([$run1, $run2, $run3]);

        $job = new TrackedJob('JobClass', $runs, 'job-alias');

        $this->assertEquals([
            [
                'message' => 'Test One',
                'count' => 2
            ],
            [
                'message' => 'Test Two',
                'count' => 1
            ],
        ], $job->getFailureReasons());
    }
}
