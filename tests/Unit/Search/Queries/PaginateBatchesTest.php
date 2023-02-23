<?php

namespace JobStatus\Tests\Unit\Search\Queries;

use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\Batch;
use JobStatus\Tests\TestCase;

class PaginateBatchesTest extends TestCase
{
    /** @test */
    public function it_can_paginate()
    {
        $batch1 = JobBatch::factory()->create();
        $batch2 = JobBatch::factory()->create();
        $batch3 = JobBatch::factory()->create();

        $jobStatuses1 = JobStatus::factory()->count(5)->create(['batch_id' => $batch1->id]);
        $jobStatuses2 = JobStatus::factory()->count(6)->create(['batch_id' => $batch2->id]);
        $jobStatuses3 = JobStatus::factory()->count(7)->create(['batch_id' => $batch3->id]);

        $runs = JobStatus::paginateBatches(1, 2);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(2, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(2, $runs->lastItem());
        $this->assertEquals(3, $runs->total());

        $collection = $runs->items();
        $this->assertCount(2, $collection);
        $this->assertContainsOnlyInstancesOf(Batch::class, $collection);

        $this->assertEquals($batch3->batch_id, $collection[0]->batchId());
        $this->assertEquals(7, $collection[0]->numberOfRuns());

        $this->assertEquals($batch2->batch_id, $collection[1]->batchId());
        $this->assertEquals(6, $collection[1]->numberOfRuns());

        $runs = JobStatus::paginateBatches(2, 2);

        $collection = $runs->items();
        $this->assertCount(1, $collection);
        $this->assertContainsOnlyInstancesOf(Batch::class, $collection);

        $this->assertEquals($batch1->batch_id, $collection[0]->batchId());
        $this->assertEquals(5, $collection[0]->numberOfRuns());
    }
}
