<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Tests\TestCase;

class JobStatusSearcherTest extends TestCase
{

    /** @test */
    public function it_filters_by_job_class(){
        $set1 = JobStatus::factory()->count(3)->create(['job_class' => 'MyJobClass']);
        $set2 = JobStatus::factory()->count(12)->create(['job_class' => 'NotMyJobClass']);

        $results = (new JobStatusSearcher())->whereJobClass('MyJobClass')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereJobClass('NotMyJobClass')->get()->raw();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_job_alias(){
        $set1 = JobStatus::factory()->count(3)->create(['job_alias' => 'MyJobAlias']);
        $set2 = JobStatus::factory()->count(12)->create(['job_alias' => 'NotMyJobAlias']);

        $results = (new JobStatusSearcher())->whereJobAlias('MyJobAlias')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereJobAlias('NotMyJobAlias')->get()->raw();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_tags(){
        $set1 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->count(3)->create();
        $set2 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->count(7)->create();

        $results = (new JobStatusSearcher())->whereTag('key1', 'val1')->get()->raw();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereTag('key1', 'val2')->get()->raw();
        $this->assertCount(7, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_statuses_in(){
        $set1 = JobStatus::factory()->count(3)->create(['status' => 'succeeded'])
            ->merge(JobStatus::factory()->count(3)->create(['status' => 'queued']));
        $set2 = JobStatus::factory()->count(4)->create(['status' => 'failed'])
            ->merge(JobStatus::factory()->count(4)->create(['status' => 'cancelled']));

        $results = (new JobStatusSearcher())->whereStatusIn(['succeeded', 'queued'])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereStatusIn(['failed', 'cancelled'])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_statuses_not_in(){
        $set1 = JobStatus::factory()->count(3)->create(['status' => 'succeeded'])
            ->merge(JobStatus::factory()->count(3)->create(['status' => 'queued']));
        $set2 = JobStatus::factory()->count(4)->create(['status' => 'failed'])
            ->merge(JobStatus::factory()->count(4)->create(['status' => 'cancelled']));

        $results = (new JobStatusSearcher())->whereStatusNotIn(['succeeded', 'queued'])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereStatusNotIn(['failed', 'cancelled'])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_finished(){
        $set1 = JobStatus::factory()->count(3)->create(['status' => 'succeeded'])
            ->merge(JobStatus::factory()->count(3)->create(['status' => 'failed']))
            ->merge(JobStatus::factory()->count(3)->create(['status' => 'cancelled']));
        $set2 = JobStatus::factory()->count(4)->create(['status' => 'queued'])
            ->merge(JobStatus::factory()->count(4)->create(['status' => 'started']));

        $results = (new JobStatusSearcher())->whereFinished()->get()->raw();
        $this->assertCount(9, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereNotFinished()->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

}
