<?php

namespace JobStatus\Tests\Unit\Search\Queries;

use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\Queue;
use JobStatus\Tests\TestCase;

class PaginateQueueTest extends TestCase
{

    /** @test */
    public function it_can_paginate()
    {
        $jobStatuses1 = JobStatus::factory()->count(5)->create(['queue' => 'queue1']);
        $jobStatuses2 = JobStatus::factory()->count(6)->create(['queue' => 'queue2']);
        $jobStatuses3 = JobStatus::factory()->count(7)->create(['queue' => 'queue3']);

        $runs = JobStatus::paginateQueues(1, 2);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(2, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(2, $runs->lastItem());
        $this->assertEquals(3, $runs->total());

        $collection = $runs->items();
        $this->assertCount(2, $collection);
        $this->assertContainsOnlyInstancesOf(Queue::class, $collection);

        $this->assertEquals('queue3', $collection[0]->name());
        $this->assertEquals(7, $collection[0]->numberOfRuns());

        $this->assertEquals('queue2', $collection[1]->name());
        $this->assertEquals(6, $collection[1]->numberOfRuns());

        $runs = JobStatus::paginateQueues(2, 2);

        $collection = $runs->items();
        $this->assertCount(1, $collection);
        $this->assertContainsOnlyInstancesOf(Queue::class, $collection);

        $this->assertEquals('queue1', $collection[0]->name());
        $this->assertEquals(5, $collection[0]->numberOfRuns());
    }

}
