<?php

namespace JobStatus\Tests\Unit\Search\Transformers;

use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Search\Collections\QueueCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Queue;
use JobStatus\Search\Transformers\QueuesTransformer;
use JobStatus\Tests\TestCase;

class QueuesTransformerTest extends TestCase
{

    /** @test */
    public function it_returns_the_jobs_with_the_basic_data_loaded(){
        $jobs1 = JobStatus::factory()->count(5)->create(['queue' => 'queue1']);
        $jobs2 = JobStatus::factory()->count(6)->create(['queue' => 'queue2']);
        $jobs3 = JobStatus::factory()->count(15)->create(['queue' => 'queue3']);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3]);

        /** @var Queue[] $results */
        $results = (new QueuesTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals('queue3', $results[0]->name());
        $this->assertEquals(15, $results[0]->numberOfRuns());

        $this->assertEquals('queue2', $results[1]->name());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals('queue1', $results[2]->name());
        $this->assertEquals(5, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_takes_into_account_grouped_runs(){
        $uuid1 = Str::uuid();

        $jobs1 = JobStatus::factory()->count(5)->create(['queue' => 'queue1', 'uuid' => $uuid1]);
        $jobs2 = JobStatus::factory()->count(6)->create(['queue' => 'queue2']);
        $jobs3 = JobStatus::factory()->count(7)->create(['queue' => 'queue3']);

        $collection = new JobStatusCollection([...$jobs1, ...$jobs2, ...$jobs3]);

        /** @var Queue[] $results */
        $results = (new QueuesTransformer())->transform($collection);

        $this->assertCount(3, $results);
        $this->assertEquals('queue3', $results[0]->name());
        $this->assertEquals(7, $results[0]->numberOfRuns());

        $this->assertEquals('queue2', $results[1]->name());
        $this->assertEquals(6, $results[1]->numberOfRuns());

        $this->assertEquals('queue1', $results[2]->name());
        $this->assertEquals(1, $results[2]->numberOfRuns());
    }

    /** @test */
    public function it_resolves_the_number_of_jobs_per_status(){
        $runs = JobStatus::factory()->count(4)->create(['queue' => 'queue1', 'status' => Status::QUEUED])
            ->merge(JobStatus::factory()->count(40)->create(['queue' => 'queue1', 'status' => Status::STARTED]))
            ->merge(JobStatus::factory()->count(23)->create(['queue' => 'queue1', 'status' => Status::FAILED]))
            ->merge(JobStatus::factory()->count(12)->create(['queue' => 'queue1', 'status' => Status::SUCCEEDED]))
            ->merge(JobStatus::factory()->count(2)->create(['queue' => 'queue1', 'status' => Status::CANCELLED]));

        $queues = (new QueuesTransformer())->transform($runs);

        $this->assertInstanceOf(QueueCollection::class, $queues);
        $this->assertContainsOnlyInstancesOf(Queue::class, $queues);
        $this->assertCount(1, $queues);

        $this->assertEquals(4, $queues[0]->countWithStatus(Status::QUEUED));
        $this->assertEquals(23, $queues[0]->countWithStatus(Status::FAILED));
        $this->assertEquals(40, $queues[0]->countWithStatus(Status::STARTED));
        $this->assertEquals(12, $queues[0]->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(2, $queues[0]->countWithStatus(Status::CANCELLED));
    }

}
