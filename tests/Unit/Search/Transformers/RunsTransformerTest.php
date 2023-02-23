<?php

namespace JobStatus\Tests\Unit\Search\Transformers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Transformers\RunsTransformer;
use JobStatus\Tests\TestCase;

class RunsTransformerTest extends TestCase
{
    /** @test */
    public function it_returns_all_runs_grouped_when_given_full_runs()
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

        $collection = (new RunsTransformer())->transform(JobStatus::all());

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
    public function it_loads_any_missing_information_given_a_uuid()
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
        $jobStatus4 = JobStatus::factory()->create(['class' => 'Class 4', 'alias' => '4', 'uuid' => Str::uuid(), 'created_at' => Carbon::now()]);

        $collection = (new RunsTransformer())->transform(JobStatus::whereIn('id', [$jobStatus1_1->id, $jobStatus2_2->id, $jobStatus3->id])->get());

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobStatus()->class);
        $this->assertEquals($jobStatus3->id, $collection[0]->jobStatus()->id);
        $this->assertNull($collection[0]->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->class);
        $this->assertEquals($jobStatus2_2->id, $collection[1]->jobStatus()->id);
        $this->assertNotNull($collection[1]->parent());
        $this->assertEquals($jobStatus2_1->id, $collection[1]->parent()->jobStatus()?->id);
        $this->assertNull($collection[1]->parent()->parent());

        $this->assertEquals('Class 1', $collection[2]->jobStatus()->class);
        $this->assertEquals($jobStatus1_3->id, $collection[2]->jobStatus()->id);
        $this->assertNotNull($collection[2]->parent());
        $this->assertEquals($jobStatus1_2->id, $collection[2]->parent()->jobStatus()?->id);
        $this->assertNotNull($collection[2]->parent()->parent());
        $this->assertEquals($jobStatus1_1->id, $collection[2]->parent()->parent()->jobStatus()?->id);
        $this->assertNull($collection[2]->parent()->parent()->parent());
    }

    /** @test */
    public function it_handles_job_statuses_with_no_uuid_by_adding_them_as_a_run()
    {
        $jobStatus1 = JobStatus::factory()->create(['class' => 'Class 1', 'job_id' => 1, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus2 = JobStatus::factory()->create(['class' => 'Class 2', 'job_id' => 2, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus3 = JobStatus::factory()->create(['class' => 'Class 3', 'job_id' => 3, 'connection_name' => 'database', 'alias' => '1', 'uuid' => null, 'created_at' => Carbon::now()->subHours(4)]);

        $collection = (new RunsTransformer())->transform(JobStatus::whereIn('id', [$jobStatus1->id, $jobStatus2->id, $jobStatus3->id])->get());

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobStatus()->class);
        $this->assertEquals($jobStatus3->id, $collection[0]->jobStatus()->id);
        $this->assertNull($collection[0]->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->class);
        $this->assertEquals($jobStatus2->id, $collection[1]->jobStatus()->id);
        $this->assertNull($collection[1]->parent());


        $this->assertEquals('Class 1', $collection[2]->jobStatus()->class);
        $this->assertEquals($jobStatus1->id, $collection[2]->jobStatus()->id);
        $this->assertNull($collection[2]->parent());
    }

    /** @test */
    public function it_handles_a_mixture_of_uuid_and_job_id_transforming()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'job_id' => 1, 'connection_name' => 'test', 'uuid' => null, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus3_1 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3_2 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = (new RunsTransformer())->transform(JobStatus::whereIn('id', [$jobStatus1_1->id, $jobStatus2->id, $jobStatus3_2->id])->get());

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobStatus()->class);
        $this->assertEquals($jobStatus3_2->id, $collection[0]->jobStatus()->id);
        $this->assertNotNull($collection[0]->parent());
        $this->assertEquals($jobStatus3_1->id, $collection[0]->parent()->jobStatus()?->id);
        $this->assertNull($collection[0]->parent()->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->class);
        $this->assertEquals($jobStatus2->id, $collection[1]->jobStatus()->id);
        $this->assertNull($collection[1]->parent());


        $this->assertEquals('Class 1', $collection[2]->jobStatus()->class);
        $this->assertEquals($jobStatus1_3->id, $collection[2]->jobStatus()->id);
        $this->assertNotNull($collection[2]->parent());
        $this->assertEquals($jobStatus1_2->id, $collection[2]->parent()->jobStatus()?->id);
        $this->assertNotNull($collection[2]->parent()->parent());
        $this->assertEquals($jobStatus1_1->id, $collection[2]->parent()->parent()->jobStatus()?->id);
        $this->assertNull($collection[2]->parent()->parent()->parent());
    }


    /** @test */
    public function it_can_do_the_same_on_limited_data()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        $jobStatus1_1 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(6)]);
        $jobStatus1_2 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(5)]);
        $jobStatus1_3 = JobStatus::factory()->create(['class' => 'Class 1', 'alias' => '1', 'uuid' => $uuid1, 'created_at' => Carbon::now()->subHours(4)]);
        $jobStatus2 = JobStatus::factory()->create(['class' => 'Class 2', 'alias' => '2', 'job_id' => 1, 'connection_name' => 'test', 'uuid' => null, 'created_at' => Carbon::now()->subHours(3)]);
        $jobStatus3_1 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(2)]);
        $jobStatus3_2 = JobStatus::factory()->create(['class' => 'Class 3', 'alias' => '3', 'uuid' => $uuid2, 'created_at' => Carbon::now()->subHours(1)]);

        $collection = (new RunsTransformer())->transform(JobStatus::whereIn('id', [$jobStatus1_1->id, $jobStatus2->id, $jobStatus3_2->id])->select(['selector'])->get());

        $this->assertCount(3, $collection);
        $this->assertInstanceOf(JobRunCollection::class, $collection);
        $this->assertContainsOnlyInstancesOf(JobRun::class, $collection);

        $this->assertEquals('Class 3', $collection[0]->jobStatus()->class);
        $this->assertEquals($jobStatus3_2->id, $collection[0]->jobStatus()->id);
        $this->assertNotNull($collection[0]->parent());
        $this->assertEquals($jobStatus3_1->id, $collection[0]->parent()->jobStatus()?->id);
        $this->assertNull($collection[0]->parent()->parent());

        $this->assertEquals('Class 2', $collection[1]->jobStatus()->class);
        $this->assertEquals($jobStatus2->id, $collection[1]->jobStatus()->id);
        $this->assertNull($collection[1]->parent());


        $this->assertEquals('Class 1', $collection[2]->jobStatus()->class);
        $this->assertEquals($jobStatus1_3->id, $collection[2]->jobStatus()->id);
        $this->assertNotNull($collection[2]->parent());
        $this->assertEquals($jobStatus1_2->id, $collection[2]->parent()->jobStatus()?->id);
        $this->assertNotNull($collection[2]->parent()->parent());
        $this->assertEquals($jobStatus1_1->id, $collection[2]->parent()->parent()->jobStatus()?->id);
        $this->assertNull($collection[2]->parent()->parent()->parent());
    }
}
