<?php

namespace JobStatus\Tests\Unit\Search\Transformers;

use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Collections\TrackedJobCollection;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Search\Transformers\JobsTransformer;
use JobStatus\Tests\TestCase;

class JobsTransformerTest extends TestCase
{
    /** @test */
    public function it_returns_the_jobs_with_the_basic_data_loaded()
    {
        $jobs1 = JobStatus::factory()->count(5)->create(['alias' => 'alias1', 'class' => 'JobClass1']);
        $jobs2 = JobStatus::factory()->count(6)->create(['alias' => 'alias2', 'class' => 'JobClass2']);
        $jobs3 = JobStatus::factory()->has(JobException::factory()->state(['message' => '123']), 'exception')->count(7)->create(['alias' => 'alias3', 'class' => 'JobClass3']);
        $jobs4 = JobStatus::factory()->has(JobException::factory()->state(['message' => '456']), 'exception')->count(8)->create(['alias' => 'alias3', 'class' => 'JobClass4']);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3, ...$jobs4]);

        /** @var TrackedJob[] $results */
        $results = (new JobsTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals('alias3', $results[0]->alias());
        $this->assertEquals('JobClass4', $results[0]->jobClass());
        $this->assertEquals(15, $results[0]->numberOfRuns());

        $this->assertEquals('alias2', $results[1]->alias());
        $this->assertEquals('JobClass2', $results[1]->jobClass());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals('alias1', $results[2]->alias());
        $this->assertEquals('JobClass1', $results[2]->jobClass());
        $this->assertEquals(5, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_loads_failure_reasons()
    {
        $jobs1 = JobStatus::factory()->count(5)
            ->withException('Test One')
            ->create(['alias' => 'alias1', 'class' => 'JobClass1', 'status' => Status::FAILED]);
        $jobs2 = JobStatus::factory()->count(6)
            ->withException('Test Two')
            ->create(['alias' => 'alias1', 'class' => 'JobClass2', 'status' => Status::FAILED]);
        $jobs3 = JobStatus::factory()->count(6)
            ->withException('Test One')
            ->create(['alias' => 'alias1', 'class' => 'JobClass3', 'status' => Status::FAILED]);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3]);

        /** @var TrackedJob[] $results */
        $results = (new JobsTransformer())->transform($collection);

        $this->assertCount(1, $results);
        $this->assertEquals('alias1', $results[0]->alias());
        $this->assertEquals([
            ['message' => 'Test One', 'count' => 11],
            ['message' => 'Test Two', 'count' => 6],
        ], $results[0]->getFailureReasons());
    }

    /** @test */
    public function it_takes_into_account_grouped_runs()
    {
        $uuid1 = Str::uuid();

        $jobs1 = JobStatus::factory()->count(5)->create(['alias' => 'alias1', 'class' => 'JobClass1', 'uuid' => $uuid1]);
        $jobs2 = JobStatus::factory()->count(6)->create(['alias' => 'alias2', 'class' => 'JobClass2']);
        $jobs3 = JobStatus::factory()->has(JobException::factory()->state(['message' => '123']), 'exception')->count(7)->create(['alias' => 'alias3', 'class' => 'JobClass3']);
        $jobs4 = JobStatus::factory()->has(JobException::factory()->state(['message' => '456']), 'exception')->count(8)->create(['alias' => 'alias3', 'class' => 'JobClass4']);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3, ...$jobs4]);

        /** @var TrackedJob[] $results */
        $results = (new JobsTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals('alias3', $results[0]->alias());
        $this->assertEquals('JobClass4', $results[0]->jobClass());
        $this->assertEquals(15, $results[0]->numberOfRuns());

        $this->assertEquals('alias2', $results[1]->alias());
        $this->assertEquals('JobClass2', $results[1]->jobClass());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals('alias1', $results[2]->alias());
        $this->assertEquals('JobClass1', $results[2]->jobClass());
        $this->assertEquals(1, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_resolves_the_number_of_jobs_per_status()
    {
        $runs = JobStatus::factory()->count(4)->create(['alias' => 'alias1', 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['alias' => 'alias1', 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['alias' => 'alias1', 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['alias' => 'alias1', 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['alias' => 'alias1', 'status' => Status::CANCELLED]));

        $jobs = $runs->jobs();

        $this->assertInstanceOf(TrackedJobCollection::class, $jobs);
        $this->assertContainsOnlyInstancesOf(TrackedJob::class, $jobs);
        $this->assertCount(1, $jobs);

        $this->assertEquals(4, $jobs[0]->countWithStatus(Status::QUEUED));
        $this->assertEquals(23, $jobs[0]->countWithStatus(Status::FAILED));
        $this->assertEquals(40, $jobs[0]->countWithStatus(Status::STARTED));
        $this->assertEquals(12, $jobs[0]->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(2, $jobs[0]->countWithStatus(Status::CANCELLED));
    }
}
