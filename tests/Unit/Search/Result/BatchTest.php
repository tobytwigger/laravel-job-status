<?php

namespace JobStatus\Tests\Unit\Search\Result;

use Carbon\Carbon;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Result\Batch;
use JobStatus\Search\Result\JobRun;
use JobStatus\Tests\TestCase;

class BatchTest extends TestCase
{
    /** @test */
    public function runs_gets_the_runs()
    {
        $batchModel = JobBatch::factory()->create();
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id])->runs();

        $batch = new Batch($batchModel, $runs);

        $collection = $batch->runs();

        $this->assertCount(4, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($runs->pluck('id')->sort()->values(), $collection->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_can_be_cast_with_to_array_and_to_json()
    {
        $batchModel = JobBatch::factory()->create(['batch_id' => 'abc123', 'name' => 'My Batch']);
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id, 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['batch_id' => $batchModel->id, 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['batch_id' => $batchModel->id, 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['batch_id' => $batchModel->id, 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['batch_id' => $batchModel->id, 'status' => Status::CANCELLED]))
            ->runs();

        $batch = new Batch($batchModel, $runs);

        $attributes = [
            'count' => 81,
            'runs' => $runs->toArray(),
            'name' => 'My Batch',
            'batch_id' => 'abc123',
            'queued' => 4,
            'started' => 40,
            'failed' => 23,
            'succeeded' => 12,
            'cancelled' => 2,
            'created_at' => $batchModel->created_at,
            'id' => $batchModel->id,
        ];

        $this->assertEquals($attributes, $batch->toArray());
        $this->assertEquals(json_encode($attributes), $batch->toJson());
    }

    /** @test */
    public function latest_gets_the_latest_run()
    {
        $batchModel = JobBatch::factory()->create();
        $runsOne = JobStatus::factory()->create(['batch_id' => $batchModel->id, 'created_at' => Carbon::now()->subHours(5)]);
        $runsTwo = JobStatus::factory()->create(['batch_id' => $batchModel->id, 'created_at' => Carbon::now()->subHours(4)]);
        $runsThree = JobStatus::factory()->create(['batch_id' => $batchModel->id, 'created_at' => Carbon::now()->subHours(3)]);
        $runsFour = JobStatus::factory()->create(['batch_id' => $batchModel->id, 'created_at' => Carbon::now()->subHours(50)]);

        $runs = (new JobStatusCollection([$runsOne, $runsTwo, $runsThree, $runsFour]))->runs();

        $batch = new Batch($batchModel, $runs);

        $run = $batch->latest();

        $this->assertInstanceOf(JobRun::class, $run);
        $this->assertTrue($runsThree->is($run->jobStatus()));
    }

    /** @test */
    public function batch_id_gets_the_batch_id()
    {
        $batchModel = JobBatch::factory()->create();
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id])->runs();

        $batch = new Batch($batchModel, $runs);

        $batchId = $batch->batchId();

        $this->assertEquals($batchModel->batch_id, $batchId);
    }

    /** @test */
    public function name_gets_the_batch_name()
    {
        $batchModel = JobBatch::factory()->create(['name' => 'My Batch']);
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id])->runs();

        $batch = new Batch($batchModel, $runs);

        $batchName = $batch->name();

        $this->assertEquals('My Batch', $batchName);
    }

    /** @test */
    public function count_runs_with_status_gets_the_count_of_jobs_with_the_status()
    {
        $batchModel = JobBatch::factory()->create(['name' => 'My Batch']);
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id, 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['batch_id' => $batchModel->id, 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['batch_id' => $batchModel->id, 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['batch_id' => $batchModel->id, 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['batch_id' => $batchModel->id, 'status' => Status::CANCELLED]))
            ->runs();

        $batch = new Batch($batchModel, $runs);

        $this->assertEquals(4, $batch->countRunsWithStatus(Status::QUEUED));
        $this->assertEquals(40, $batch->countRunsWithStatus(Status::STARTED));
        $this->assertEquals(23, $batch->countRunsWithStatus(Status::FAILED));
        $this->assertEquals(12, $batch->countRunsWithStatus(Status::SUCCEEDED));
        $this->assertEquals(2, $batch->countRunsWithStatus(Status::CANCELLED));
    }
}
