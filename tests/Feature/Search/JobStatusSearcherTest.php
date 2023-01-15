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
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = (new JobStatusSearcher())->whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereStatusIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_statuses_not_in(){
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = (new JobStatusSearcher())->whereStatusNotIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereStatusNotIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get()->raw();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());
    }

    /** @test */
    public function it_filters_by_finished(){
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]))
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::QUEUED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::STARTED]));

        $results = (new JobStatusSearcher())->whereFinished()->get()->raw();
        $this->assertCount(9, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set1->pluck('id')->sort());

        $results = (new JobStatusSearcher())->whereNotFinished()->get()->raw();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort(), $set2->pluck('id')->sort());
    }

}
