<?php

namespace JobStatus\Tests\Feature\Search;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Tests\TestCase;

class JobStatusSearcherTest extends TestCase
{
    /** @test */
    public function it_filters_by_uuid()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        $set1 = JobStatus::factory()->count(3)->create(['uuid' => $uuid1]);
        $set2 = JobStatus::factory()->count(12)->create(['uuid' => $uuid2]);

        $results = (new JobStatusSearcher())->whereUuid($uuid1)->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereUuid($uuid2)->get()->raw();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_job_class()
    {
        $set1 = JobStatus::factory()->count(3)->create(['job_class' => 'MyJobClass']);
        $set2 = JobStatus::factory()->count(12)->create(['job_class' => 'NotMyJobClass']);

        $results = (new JobStatusSearcher())->whereJobClass('MyJobClass')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereJobClass('NotMyJobClass')->get()->raw();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_job_alias()
    {
        $set1 = JobStatus::factory()->count(3)->create(['job_alias' => 'MyJobAlias']);
        $set2 = JobStatus::factory()->count(12)->create(['job_alias' => 'NotMyJobAlias']);

        $results = (new JobStatusSearcher())->whereJobAlias('MyJobAlias')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereJobAlias('NotMyJobAlias')->get()->raw();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_tags()
    {
        $set1 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->count(3)->create();
        $set2 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->count(7)->create();

        $results = (new JobStatusSearcher())->whereTag('key1', 'val1')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereTag('key1', 'val2')->get()->raw();
        $this->assertCount(7, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_statuses_in()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = (new JobStatusSearcher())->whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereStatusIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_statuses_not_in()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = (new JobStatusSearcher())->whereStatusNotIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereStatusNotIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());
    }


    /** @test */
    public function it_filters_by_updated_before()
    {
        $set1 = JobStatus::factory()->count(3)->create(['updated_at' => Carbon::now()->subHours(5)]);
        $set2 = JobStatus::factory()->count(4)->create(['updated_at' => Carbon::now()->subHours(3)]);

        $results = (new JobStatusSearcher())
            ->whereUpdatedBefore(Carbon::now()->subHours(4))
            ->get()
            ->raw();

        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values()->values(), $set1->pluck('id')->sort()->values()->values());
    }

    /** @test */
    public function it_filters_by_finished_and_not_finished()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]))
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::QUEUED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::STARTED]));

        $results = (new JobStatusSearcher())->whereFinished()->get()->raw();
        $this->assertCount(9, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = (new JobStatusSearcher())->whereNotFinished()->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_orders_runs_by_run_date()
    {
        $jobStatus1 = JobStatus::factory()->create([
            'job_class' => 'class1', 'job_alias' => 'class1-alias', 'uuid' => '123',
            'updated_at' => now()->subMinutes(5), 'created_at' => now()->subMinutes(5),
        ]);
        $jobStatus2 = JobStatus::factory()->create([
            'job_class' => 'class1', 'job_alias' => 'class1-alias', 'uuid' => '456',
            'updated_at' => now()->subMinutes(4), 'created_at' => now()->subMinutes(4),
        ]);
        $jobStatus3 = JobStatus::factory()->create([
            'job_class' => 'class1', 'job_alias' => 'class1-alias', 'uuid' => '123',
            'updated_at' => now()->subMinutes(3), 'created_at' => now()->subMinutes(3),
        ]);
        $jobStatus4 = JobStatus::factory()->create([
            'job_class' => 'class1', 'job_alias' => 'class1-alias', 'uuid' => '789',
            'updated_at' => now()->subMinutes(2), 'created_at' => now()->subMinutes(2),
        ]);
        $jobStatus5 = JobStatus::factory()->create([
            'job_class' => 'class1', 'job_alias' => 'class1-alias', 'uuid' => '789',
            'updated_at' => now()->subMinutes(1), 'created_at' => now()->subMinutes(1),
        ]);

        $results = (new JobStatusSearcher())->get()->first()->runs();

        $this->assertCount(3, $results);
        $this->assertEquals($jobStatus5->id, $results[0]->jobStatus()->id);
        $this->assertEquals($jobStatus3->id, $results[1]->jobStatus()->id);
        $this->assertEquals($jobStatus2->id, $results[2]->jobStatus()->id);
    }
}
