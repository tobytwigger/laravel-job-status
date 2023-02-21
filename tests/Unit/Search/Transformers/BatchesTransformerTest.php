<?php

namespace JobStatus\Tests\Unit\Search\Transformers;

use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Collections\BatchCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Batch;
use JobStatus\Search\Transformers\BatchesTransformer;
use JobStatus\Tests\TestCase;

class BatchesTransformerTest extends TestCase
{

    /** @test */
    public function it_returns_the_jobs_with_the_basic_data_loaded(){
        $batch1 = JobBatch::factory()->create();
        $batch2 = JobBatch::factory()->create();
        $batch3 = JobBatch::factory()->create();

        $jobs1 = JobStatus::factory()->count(5)->create(['batch_id' => $batch1->id]);
        $jobs2 = JobStatus::factory()->count(6)->create(['batch_id' => $batch2->id]);
        $jobs3 = JobStatus::factory()->count(15)->create(['batch_id' => $batch3->id]);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3]);

        /** @var Batch[] $results */
        $results = (new BatchesTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals($batch3->batch_id, $results[0]->batchId());
        $this->assertEquals(15, $results[0]->numberOfRuns());

        $this->assertEquals($batch2->batch_id, $results[1]->batchId());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals($batch1->batch_id, $results[2]->batchId());
        $this->assertEquals(5, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_takes_into_account_grouped_runs(){
        $batch1 = JobBatch::factory()->create();
        $batch2 = JobBatch::factory()->create();
        $batch3 = JobBatch::factory()->create();

        $uuid1 = Str::uuid();

        $jobs1 = JobStatus::factory()->count(5)->create(['batch_id' => $batch1->id, 'uuid' => $uuid1]);
        $jobs2 = JobStatus::factory()->count(6)->create(['batch_id' => $batch2->id]);
        $jobs3 = JobStatus::factory()->count(7)->create(['batch_id' => $batch3->id]);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3]);

        /** @var Batch[] $results */
        $results = (new BatchesTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals($batch3->batch_id, $results[0]->batchId());
        $this->assertEquals(7, $results[0]->numberOfRuns());

        $this->assertEquals($batch2->batch_id, $results[1]->batchId());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals($batch1->batch_id, $results[2]->batchId());
        $this->assertEquals(1, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_resolves_the_number_of_jobs_per_status(){
        $batch1 = JobBatch::factory()->create();

        $runs = JobStatus::factory()->count(4)->create(['batch_id' => $batch1->id, 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['batch_id' => $batch1->id, 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['batch_id' => $batch1->id, 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['batch_id' => $batch1->id, 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['batch_id' => $batch1->id, 'status' => Status::CANCELLED]));

        $queues = (new BatchesTransformer())->transform($runs);

        $this->assertInstanceOf(BatchCollection::class, $queues);
        $this->assertContainsOnlyInstancesOf(Batch::class, $queues);
        $this->assertCount(1, $queues);

        $this->assertEquals(4, $queues[0]->countWithStatus(Status::QUEUED));
        $this->assertEquals(23, $queues[0]->countWithStatus(Status::FAILED));
        $this->assertEquals(40, $queues[0]->countWithStatus(Status::STARTED));
        $this->assertEquals(12, $queues[0]->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(2, $queues[0]->countWithStatus(Status::CANCELLED));
    }

}
