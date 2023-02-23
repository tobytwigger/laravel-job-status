<?php

namespace JobStatus\Tests\Unit\Search\Queries;

use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Transformers\RunsTransformer;
use JobStatus\Tests\TestCase;

class PaginateRunsTest extends TestCase
{

    /** @test */
    public function it_can_paginate()
    {
        $jobStatuses = JobStatus::factory(['is_unprotected' => true])->count(10)->create();

        $runs = JobStatus::paginateRuns(1, 5);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(5, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(5, $runs->lastItem());
        $this->assertEquals(10, $runs->total());

        $collection = $runs->items();
        $this->assertCount(5, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatuses[9]->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatuses[8]->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatuses[7]->id, $collection[2]->jobStatus()->id);
        $this->assertEquals($jobStatuses[6]->id, $collection[3]->jobStatus()->id);
        $this->assertEquals($jobStatuses[5]->id, $collection[4]->jobStatus()->id);

        /** @var LengthAwarePaginator $runs */
        $runs = JobStatus::paginateRuns(2, 5);

        $this->assertEquals(2, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(5, $runs->perPage());
        $this->assertEquals(6, $runs->firstItem());
        $this->assertEquals(10, $runs->lastItem());
        $this->assertEquals(10, $runs->total());

        $collection = $runs->items();
        $this->assertCount(5, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatuses[4]->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatuses[3]->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatuses[2]->id, $collection[2]->jobStatus()->id);
        $this->assertEquals($jobStatuses[1]->id, $collection[3]->jobStatus()->id);
        $this->assertEquals($jobStatuses[0]->id, $collection[4]->jobStatus()->id);
    }

    /** @test */
    public function it_can_paginate_using_just_uuids(){
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();
        $uuid3 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2_1 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus2_2 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid3, 'created_at' => Carbon::now()->subHours(1)]);

        $runs = JobStatus::paginateRuns(1, 3);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(1, $runs->lastPage());
        $this->assertEquals(3, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(3, $runs->lastItem());
        $this->assertEquals(3, $runs->total());

        $collection = $runs->items();

        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatus3->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatus2_2->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatus2_1->id, $collection[1]->parent()->jobStatus()->id);
        $this->assertEquals($jobStatus1_3->id, $collection[2]->jobStatus()->id);
        $this->assertEquals($jobStatus1_2->id, $collection[2]->parent()->jobStatus()->id);
        $this->assertEquals($jobStatus1_1->id, $collection[2]->parent()->parent()->jobStatus()->id);
    }

    /** @test */
    public function it_can_paginate_using_just_job_ids_with_no_uuids(){

        $jobStatus1 = JobStatus::factory()->create(['class' => 'Class 1', 'job_id' => 1, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus2 = JobStatus::factory()->create(['class' => 'Class 2', 'job_id' => 2, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus3 = JobStatus::factory()->create(['class' => 'Class 3', 'job_id' => 3, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(4)]);

        $runs = JobStatus::paginateRuns(1, 3);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(1, $runs->lastPage());
        $this->assertEquals(3, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(3, $runs->lastItem());
        $this->assertEquals(3, $runs->total());

        $collection = $runs->items();

        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatus3->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatus2->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatus1->id, $collection[2]->jobStatus()->id);

    }


    /** @test */
    public function it_can_paginate_with_a_mixture(){
        $uuid1 = Str::uuid();

        $jobStatus1 = JobStatus::factory()->create(['class' => 'Class 1', 'job_id' => 1, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus2 = JobStatus::factory()->create(['class' => 'Class 2', 'job_id' => 2, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus3_1 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus3_2 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus4 = JobStatus::factory()->create(['class' => 'Class 3', 'job_id' => 4, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(1)]);

        $runs = JobStatus::paginateRuns(1, 2);

        $this->assertEquals(1, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(2, $runs->perPage());
        $this->assertEquals(1, $runs->firstItem());
        $this->assertEquals(2, $runs->lastItem());
        $this->assertEquals(4, $runs->total());

        $collection = $runs->items();

        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatus4->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatus3_2->id, $collection[1]->jobStatus()->id);
        $this->assertEquals($jobStatus3_1->id, $collection[1]->parent()->jobStatus()->id);

        $runs = JobStatus::paginateRuns(2, 2);

        $this->assertEquals(2, $runs->currentPage());
        $this->assertEquals(2, $runs->lastPage());
        $this->assertEquals(2, $runs->perPage());
        $this->assertEquals(3, $runs->firstItem());
        $this->assertEquals(4, $runs->lastItem());
        $this->assertEquals(4, $runs->total());

        $collection = $runs->items();

        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals($jobStatus2->id, $collection[0]->jobStatus()->id);
        $this->assertEquals($jobStatus1->id, $collection[1]->jobStatus()->id);

    }

}
