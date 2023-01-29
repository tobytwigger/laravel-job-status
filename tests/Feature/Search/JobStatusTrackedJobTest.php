<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusTrackedJobTest extends TestCase
{

    /** @test */
    public function runs_returns_the_runs(){
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());
        $runs = collect([
            $run1, $run2, $run3
        ]);

        $job = new TrackedJob('JobClass', $runs, 'job-alias');
        $this->assertEquals($runs, $job->runs());
    }

    /** @test */
    public function alias_returns_the_alias(){
        $job = new TrackedJob('JobClass', collect(), 'job-alias');
        $this->assertEquals('job-alias', $job->alias());
    }

    /** @test */
    public function jobClass_returns_the_alias(){
        $job = new TrackedJob('JobClass', collect(), 'job-alias');
        $this->assertEquals('JobClass', $job->jobClass());
    }

    /** @test */
    public function jobAlias_returns_the_alias(){
        $job = new TrackedJob('JobClass', collect(), 'job-alias');
        $this->assertEquals('job-alias', $job->jobAlias());
    }

    /** @test */
    public function latest_returns_the_latest_run(){
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $job = new TrackedJob('JobClass', collect([
            $run1, $run2, $run3
        ]), 'job-alias');
        $this->assertEquals($run1, $job->latest());
    }

    /** @test */
    public function numberOfRuns_returns_the_number_of_runs(){
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $job = new TrackedJob('JobClass', collect([
            $run1, $run2, $run3
        ]), 'job-alias');
        $this->assertEquals(3, $job->numberOfRuns());
    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json(){
        $run1 = new JobRun(JobStatus::factory()->create());
        $run2 = new JobRun(JobStatus::factory()->create());
        $run3 = new JobRun(JobStatus::factory()->create());

        $runs = collect([$run1, $run2, $run3]);

        $job = new TrackedJob('JobClass', $runs, 'job-alias');

        $array = [
            'count' => 3,
            'alias' => 'job-alias',
            'class' => 'JobClass',
            'runs' => $runs->toArray()
        ];
        $this->assertEquals($array, $job->toArray());
        $this->assertEquals(json_encode($array), $job->toJson());
    }
}
