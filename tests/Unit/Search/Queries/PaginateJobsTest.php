<?php

namespace JobStatus\Tests\Unit\Search\Queries;

use Illuminate\Pagination\LengthAwarePaginator;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class PaginateJobsTest extends TestCase
{

    /** @test */
    public function it_can_paginate()
    {
        $jobStatuses1 = JobStatus::factory()->count(5)->create(['alias' => 'alias1']);
        $jobStatuses2 = JobStatus::factory()->count(6)->create(['alias' => 'alias2']);
        $jobStatuses3 = JobStatus::factory()->count(7)->create(['alias' => 'alias3']);

        $runs = JobStatus::paginateJobs(1, 2);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(2, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(2, $runs->lastItem());
        $this->assertEquals(3, $runs->total());

        $collection = $runs->items();
        $this->assertCount(2, $collection);
        $this->assertContainsOnlyInstancesOf(TrackedJob::class, $collection);

        $this->assertEquals('alias3', $collection[0]->alias());
        $this->assertEquals(7, $collection[0]->numberOfRuns());

        $this->assertEquals('alias2', $collection[1]->alias());
        $this->assertEquals(6, $collection[1]->numberOfRuns());

        $runs = JobStatus::paginateJobs(2, 2);

        $collection = $runs->items();
        $this->assertCount(1, $collection);
        $this->assertContainsOnlyInstancesOf(TrackedJob::class, $collection);

        $this->assertEquals('alias1', $collection[0]->alias());
        $this->assertEquals(5, $collection[0]->numberOfRuns());
    }

}
