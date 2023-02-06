<?php

namespace JobStatus\Tests\Unit\Search\Result;

use JobStatus\Enums\Status;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Queue;
use JobStatus\Tests\TestCase;

class QueueTest extends TestCase
{
    /** @test */
    public function runs_gets_the_runs()
    {
        $runs = JobStatus::factory()->count(4)->create(['queue' => 'my-queue'])->runs();

        $queue = new Queue('my-queue', $runs);

        $collection = $queue->runs();

        $this->assertCount(4, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($runs->pluck('id')->sort()->values(), $collection->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_can_be_cast_with_to_array_and_to_json()
    {
        $runs = JobStatus::factory()->count(4)->create(['queue' => 'my-queue', 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['queue' => 'my-queue', 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['queue' => 'my-queue', 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['queue' => 'my-queue', 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['queue' => 'my-queue', 'status' => Status::CANCELLED]))
            ->runs();

        $queue = new Queue('my-queue', $runs);

        $attributes = [
            'count' => 81,
            'runs' => $runs->toArray(),
            'name' => 'my-queue',
            'queued' => 4,
            'started' => 40,
            'failed' => 23,
            'succeeded' => 12,
            'cancelled' => 2,
        ];

        $this->assertEquals($attributes, $queue->toArray());
        $this->assertEquals(json_encode($attributes), $queue->toJson());
    }

    /** @test */
    public function name_gets_the_queue_name()
    {
        $runs = JobStatus::factory()->count(4)->create(['queue' => 'my-queue'])->runs();

        $queue = new Queue('my-queue', $runs);

        $queueName = $queue->name();

        $this->assertEquals('my-queue', $queueName);
    }

    /** @test */
    public function count_runs_with_status_gets_the_count_of_jobs_with_the_status()
    {
        $runs = JobStatus::factory()->count(4)->create(['queue' => 'my-queue', 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['queue' => 'my-queue', 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['queue' => 'my-queue', 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['queue' => 'my-queue', 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['queue' => 'my-queue', 'status' => Status::CANCELLED]))
            ->runs();

        $queue = new Queue('my-queue', $runs);

        $this->assertEquals(4, $queue->countRunsWithStatus(Status::QUEUED));
        $this->assertEquals(40, $queue->countRunsWithStatus(Status::STARTED));
        $this->assertEquals(23, $queue->countRunsWithStatus(Status::FAILED));
        $this->assertEquals(12, $queue->countRunsWithStatus(Status::SUCCEEDED));
        $this->assertEquals(2, $queue->countRunsWithStatus(Status::CANCELLED));
    }
}
