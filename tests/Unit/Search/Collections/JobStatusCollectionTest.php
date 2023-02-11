<?php

namespace JobStatus\Tests\Unit\Search\Collections;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\BatchCollection;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\QueueCollection;
use JobStatus\Search\Collections\TrackedJobCollection;
use JobStatus\Search\Result\Batch;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Queue;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class JobStatusCollectionTest extends TestCase
{
    /** @test */
    public function it_returns_all_runs_grouped()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();
        $uuid3 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2_1 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_2 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = JobStatus::all()
            ->runs();

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobStatus()->class);
        $this->assertEquals($jobStatus3->id, $collection[0]->jobStatus()->id);
        $this->assertNull($collection[0]->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->class);
        $this->assertEquals($jobStatus2_2->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatus2_1->id, $collection[1]->parent()->jobStatus()?->id);
        $this->assertNull($collection[1]->parent()->parent());

        $this->assertEquals('Class 1', $collection[2]->jobStatus()->class);
        $this->assertEquals($jobStatus1_3->id, $collection[2]->jobStatus()->id);
        $this->assertEquals($jobStatus1_2->id, $collection[2]->parent()->jobStatus()?->id);
        $this->assertEquals($jobStatus1_1->id, $collection[2]->parent()->parent()->jobStatus()?->id);
        $this->assertNull($collection[2]->parent()->parent()->parent());
    }

    /** @test */
    public function it_returns_all_jobs_grouped()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();
        $uuid3 = Str::uuid();
        $uuid4 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => 'one', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => 'one', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => 'one', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2_1 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => 'two', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_2 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => 'two', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => 'three', 'uuid' => $uuid4, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = JobStatus::all()
            ->jobs();

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(TrackedJobCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(TrackedJob::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobClass());
        $this->assertCount(1, $collection[0]->runs());
        $this->assertEquals($jobStatus3->id, $collection[0]->runs()[0]->jobStatus()->id);
        $this->assertNull($collection[0]->runs()[0]->parent());

        $this->assertEquals('Class 2', $collection[1]->jobClass());
        $this->assertCount(1, $collection[1]->runs());
        $this->assertEquals($jobStatus2_2->id, $collection[1]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus2_1->id, $collection[1]->runs()[0]->parent()->jobStatus()->id);

        $this->assertEquals('Class 1', $collection[2]->jobClass());
        $this->assertCount(2, $collection[2]->runs());
        $this->assertEquals($jobStatus1_3->id, $collection[2]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1_2->id, $collection[2]->runs()[1]->jobStatus()->id);
        $this->assertEquals($jobStatus1_1->id, $collection[2]->runs()[1]->parent()->jobStatus()->id);
    }

    /** @test */
    public function it_returns_all_jobs_grouped_by_batch()
    {
        $batch1 = JobBatch::factory()->create();
        $batch2 = JobBatch::factory()->create();
        $batch3 = JobBatch::factory()->create();
        $batch4 = JobBatch::factory()->create();

        $jobStatus4 = JobStatus::factory()->create(['batch_id' => $batch4->id, 'created_at' => Carbon::now()->subHours(1)]);
        $jobStatus3_2 = JobStatus::factory()->create(['batch_id' => $batch3->id, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3_1 = JobStatus::factory()->create(['batch_id' => $batch3->id, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_1 = JobStatus::factory()->create(['batch_id' => $batch2->id, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus1_2 = JobStatus::factory()->create(['batch_id' => $batch1->id, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_1 = JobStatus::factory()->create(['batch_id' => $batch1->id, 'created_at' => Carbon::now()->subHours(6)]);

        $collection = JobStatus::all()
            ->batches();

        $this->assertCount(4, $collection);
        $this->assertInstanceOf(BatchCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(Batch::class, $collection);

        $this->assertEquals($batch4->batch_id, $collection[0]->batchId());
        $this->assertCount(1, $collection[0]->runs());
        $this->assertEquals($jobStatus4->id, $collection[0]->runs()[0]->jobStatus()->id);

        $this->assertEquals($batch3->batch_id, $collection[1]->batchId());
        $this->assertCount(2, $collection[1]->runs());
        $this->assertEquals($jobStatus3_2->id, $collection[1]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus3_1->id, $collection[1]->runs()[1]->jobStatus()->id);

        $this->assertEquals($batch2->batch_id, $collection[2]->batchId());
        $this->assertCount(1, $collection[2]->runs());
        $this->assertEquals($jobStatus2_1->id, $collection[2]->runs()[0]->jobStatus()->id);

        $this->assertEquals($batch1->batch_id, $collection[3]->batchId());
        $this->assertCount(2, $collection[3]->runs());
        $this->assertEquals($jobStatus1_2->id, $collection[3]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1_1->id, $collection[3]->runs()[1]->jobStatus()->id);
    }

    /** @test */
    public function it_returns_all_jobs_grouped_by_queue()
    {
        $jobStatus1_1 = JobStatus::factory()->create(['queue' => 'queue1', 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['queue' => 'queue1', 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus2_1 = JobStatus::factory()->create(['queue' => 'queue2', 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus3_1 = JobStatus::factory()->create(['queue' => 'queue3', 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus3_2 = JobStatus::factory()->create(['queue' => 'queue3', 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus4 = JobStatus::factory()->create(['queue' => 'queue4', 'created_at' => Carbon::now()->subHours(1)]);

        $collection = JobStatus::all()
            ->queues();

        $this->assertCount(4, $collection);
        $this->assertInstanceOf(QueueCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(Queue::class, $collection);

        $this->assertEquals('queue4', $collection[0]->name());
        $this->assertCount(1, $collection[0]->runs());
        $this->assertEquals($jobStatus4->id, $collection[0]->runs()[0]->jobStatus()->id);

        $this->assertEquals('queue3', $collection[1]->name());
        $this->assertCount(2, $collection[1]->runs());
        $this->assertEquals($jobStatus3_2->id, $collection[1]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus3_1->id, $collection[1]->runs()[1]->jobStatus()->id);

        $this->assertEquals('queue2', $collection[2]->name());
        $this->assertCount(1, $collection[2]->runs());
        $this->assertEquals($jobStatus2_1->id, $collection[2]->runs()[0]->jobStatus()->id);

        $this->assertEquals('queue1', $collection[3]->name());
        $this->assertCount(2, $collection[3]->runs());
        $this->assertEquals($jobStatus1_2->id, $collection[3]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1_1->id, $collection[3]->runs()[1]->jobStatus()->id);
    }
}
