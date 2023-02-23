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
    public function it_can_be_cast_with_to_array_and_to_json()
    {
        $batchModel = JobBatch::factory()->create(['batch_id' => 'abc123', 'name' => 'My Batch']);
        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batchModel->id, 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['batch_id' => $batchModel->id, 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['batch_id' => $batchModel->id, 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['batch_id' => $batchModel->id, 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['batch_id' => $batchModel->id, 'status' => Status::CANCELLED]))
            ->runs();

        $batch = new Batch($batchModel, 55, countWithStatus: [
            Status::QUEUED->value => 5,
            Status::FAILED->value => 10,
            Status::STARTED->value => 15,
            Status::SUCCEEDED->value => 20,
            Status::CANCELLED->value => 25
        ]);

        $attributes = [
            'count' => 55,
            'name' => 'My Batch',
            'batch_id' => 'abc123',
            'queued' => 5,
            'started' => 15,
            'failed' => 10,
            'succeeded' => 20,
            'cancelled' => 25,
            'created_at' => $batchModel->created_at,
            'id' => $batchModel->id,
        ];

        $this->assertEquals($attributes, $batch->toArray());
        $this->assertEquals(json_encode($attributes), $batch->toJson());
    }

    /** @test */
    public function batch_id_gets_the_batch_id()
    {
        $batchModel = JobBatch::factory()->create();

        $batch = new Batch($batchModel);

        $batchId = $batch->batchId();

        $this->assertEquals($batchModel->batch_id, $batchId);
    }

    /** @test */
    public function name_gets_the_batch_name()
    {
        $batchModel = JobBatch::factory()->create(['name' => 'My Batch']);

        $batch = new Batch($batchModel);

        $batchName = $batch->name();

        $this->assertEquals('My Batch', $batchName);
    }

    /** @test */
    public function count_runs_with_status_gets_the_count_of_jobs_with_the_status()
    {
        $batchModel = JobBatch::factory()->create(['name' => 'My Batch']);

        $batch = new Batch($batchModel, countWithStatus: [
            Status::QUEUED->value => 5,
            Status::FAILED->value => 10,
            Status::STARTED->value => 15,
            Status::SUCCEEDED->value => 20,
            Status::CANCELLED->value => 25
        ]);

        $this->assertEquals(5, $batch->countWithStatus(Status::QUEUED));
        $this->assertEquals(10, $batch->countWithStatus(Status::FAILED));
        $this->assertEquals(15, $batch->countWithStatus(Status::STARTED));
        $this->assertEquals(20, $batch->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(25, $batch->countWithStatus(Status::CANCELLED));
    }

    /** @test */
    public function it_returns_the_number_of_runs(){
        $batchModel = JobBatch::factory()->create(['name' => 'My Batch']);

        $batch = new Batch($batchModel, numberOfRuns: 22);

        $this->assertEquals(22, $batch->numberOfRuns());
    }
}
