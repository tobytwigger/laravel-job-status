<?php

namespace JobStatus\Tests\Unit\Search\Collections;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\TrackedJobCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class JobStatusCollectionTest extends TestCase
{

    /** @test */
    public function it_returns_all_runs_grouped(){
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();
        $uuid3 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2_1 = JobStatus::factory()->create(['job_class' => 'Class 2', 'job_alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_2 = JobStatus::factory()->create(['job_class' => 'Class 2', 'job_alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3 = JobStatus::factory()->create(['job_class' => 'Class 3', 'job_alias' => '3', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = JobStatus::all()
            ->runs();

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 1', $collection[0]->jobStatus()->job_class);
        $this->assertEquals($jobStatus1_3->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1_2->id, $collection[0]->parent()->jobStatus()?->id);
        $this->assertEquals($jobStatus1_1->id, $collection[0]->parent()->parent()->jobStatus()?->id);
        $this->assertNull($collection[0]->parent()->parent()->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->job_class);
        $this->assertEquals($jobStatus2_2->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatus2_1->id, $collection[1]->parent()->jobStatus()?->id);
        $this->assertNull($collection[1]->parent()->parent());

        $this->assertEquals('Class 3', $collection[2]->jobStatus()->job_class);
        $this->assertEquals($jobStatus3->id, $collection[2]->jobStatus()->id);
        $this->assertNull($collection[2]->parent());

    }

    /** @test */
    public function it_returns_all_jobs_grouped(){
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();
        $uuid3 = Str::uuid();
        $uuid4 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => 'one', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => 'one', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['job_class' => 'Class 1', 'job_alias' => 'one', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2_1 = JobStatus::factory()->create(['job_class' => 'Class 2', 'job_alias' => 'two', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_2 = JobStatus::factory()->create(['job_class' => 'Class 2', 'job_alias' => 'two', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3 = JobStatus::factory()->create(['job_class' => 'Class 3', 'job_alias' => 'three', 'uuid' => $uuid4, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = JobStatus::all()
            ->jobs();

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(TrackedJobCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(TrackedJob::class, $collection);

        $this->assertEquals('Class 1', $collection[0]->jobClass());
        $this->assertCount(2, $collection[0]->runs());
        $this->assertEquals($jobStatus1_2->id, $collection[0]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1_1->id, $collection[0]->runs()[0]->parent()->jobStatus()->id);
        $this->assertEquals($jobStatus1_3->id, $collection[0]->runs()[1]->jobStatus()->id);

        $this->assertEquals('Class 2', $collection[1]->jobClass());
        $this->assertCount(1, $collection[1]->runs());
        $this->assertEquals($jobStatus2_2->id, $collection[1]->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus2_1->id, $collection[1]->runs()[0]->parent()->jobStatus()->id);

        $this->assertEquals('Class 3', $collection[2]->jobClass());
        $this->assertCount(1, $collection[2]->runs());
        $this->assertEquals($jobStatus3->id, $collection[2]->runs()[0]->jobStatus()->id);
        $this->assertNull($collection[2]->runs()[0]->parent());
    }

}
