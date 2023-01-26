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
    public function it_filters_by_uuid(){
    $this->markTestIncomplete('Copied');
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
    public function it_filters_by_job_class(){
        $this->markTestIncomplete('failing');

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
        $this->markTestIncomplete('failing');

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
        $this->markTestIncomplete('failing');

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
        $this->markTestIncomplete('failing');

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
        $this->markTestIncomplete('failing');

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
    public function it_filters_by_finished_and_not_finished(){
        $this->markTestIncomplete('failing');
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

    /** @test */
    public function it_orders_runs_by_run_date(){
        $this->markTestIncomplete('failing');
        $jobStatus1 = JobStatus::factory()->create(['job_class' => 'class1', 'uuid' => '123', 'updated_at' => now()->subMinutes(5), 'created_at' => now()->subMinutes(5)]);
        $jobStatus2 = JobStatus::factory()->create(['job_class' => 'class1', 'uuid' => '456', 'updated_at' => now()->subMinutes(4), 'created_at' => now()->subMinutes(4)]);
        $jobStatus3 = JobStatus::factory()->create(['job_class' => 'class1', 'uuid' => '123', 'updated_at' => now()->subMinutes(3), 'created_at' => now()->subMinutes(3)]);
        $jobStatus4 = JobStatus::factory()->create(['job_class' => 'class1', 'uuid' => '789', 'updated_at' => now()->subMinutes(2), 'created_at' => now()->subMinutes(2)]);
        $jobStatus5 = JobStatus::factory()->create(['job_class' => 'class1', 'uuid' => '789', 'updated_at' => now()->subMinutes(1), 'created_at' => now()->subMinutes(1)]);

        $results = (new JobStatusSearcher())->get()->first();

        $this->assertCount(3, $results->runs());
        $this->assertEquals($jobStatus2->id, $results->runs()[0]->jobStatus()->id);
        $this->assertEquals($jobStatus3->id, $results->runs()[1]->jobStatus()->id);
        $this->assertEquals($jobStatus5->id, $results->runs()[2]->jobStatus()->id);
    }

}
