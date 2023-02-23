<?php

namespace JobStatus\Tests\Unit\Search\Result;

use JobStatus\Enums\Status;
use JobStatus\Search\Result\Queue;
use JobStatus\Tests\TestCase;

class QueueTest extends TestCase
{
    /** @test */
    public function it_can_be_cast_with_to_array_and_to_json()
    {
        $queue = new Queue('my-queue', 55, countWithStatus: [
            Status::QUEUED->value => 5,
            Status::FAILED->value => 10,
            Status::STARTED->value => 15,
            Status::SUCCEEDED->value => 20,
            Status::CANCELLED->value => 25,
        ]);

        $attributes = [
            'count' => 55,
            'name' => 'my-queue',
            'queued' => 5,
            'started' => 15,
            'failed' => 10,
            'succeeded' => 20,
            'cancelled' => 25,
        ];

        $this->assertEquals($attributes, $queue->toArray());
        $this->assertEquals(json_encode($attributes), $queue->toJson());
    }

    /** @test */
    public function name_gets_the_queue_name()
    {
        $queue = new Queue('my-queue');

        $queueName = $queue->name();

        $this->assertEquals('my-queue', $queueName);
    }

    /** @test */
    public function count_runs_with_status_gets_the_count_of_jobs_with_the_status()
    {
        $queue = new Queue('my-queue', countWithStatus: [
            Status::QUEUED->value => 5,
            Status::FAILED->value => 10,
            Status::STARTED->value => 15,
            Status::SUCCEEDED->value => 20,
            Status::CANCELLED->value => 25,
        ]);

        $this->assertEquals(5, $queue->countWithStatus(Status::QUEUED));
        $this->assertEquals(10, $queue->countWithStatus(Status::FAILED));
        $this->assertEquals(15, $queue->countWithStatus(Status::STARTED));
        $this->assertEquals(20, $queue->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(25, $queue->countWithStatus(Status::CANCELLED));
    }

    /** @test */
    public function it_returns_the_number_of_runs()
    {
        $queue = new Queue('my-queue', numberOfRuns: 22);

        $this->assertEquals(22, $queue->numberOfRuns());
    }
}
