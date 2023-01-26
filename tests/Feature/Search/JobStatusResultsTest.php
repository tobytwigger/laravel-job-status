<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusResultsTest extends TestCase
{

    /** @test */
    public function raw_orders_runs_by_run_date(){
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

    public function it_gets_the_first_tracked_job_when_first_called_directly_from_the_searcher()
    {
        $this->markTestIncomplete();
    }

    /** @test */
    public function it_returns_all_jobs(){

    }

    /** @test */
    public function raw_returns_the_job_status_models(){

    }

    /** @test */
    public function runs_returns_all_the_runs_ordered_by_created_at_of_the_most_recent_run(){

    }

    /** @test */
    public function runs_and_retries_gets_the_runs_and_retries_not_grouped(){

    }

    /** @test */
    public function first_returns_the_first_matching_job(){

    }

    /** @test */
    public function count_returns_the_number_of_jobs(){

    }

    /** @test */
    public function runCount_returns_the_number_of_runs_excluding_retries(){

    }

    /** @test */
    public function firstRun_gets_the_first_matching_run(){

    }

    /** @test */
    public function it_can_convert_to_an_array_and_json(){

    }



//    /** @test */
//    public function i_can_filter_by_type_and_tags(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get()->jobOfTypeWithTags('JobClass1', ['key1' => 'val1']);
//        $this->assertInstanceOf(TrackedJob::class, $result);
//        $this->assertEquals(['key1' => 'val1'], $result->tags());
//    }
//
//    /** @test */
//    public function i_can_shortcut_getting_the_first_job(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get()->first();
//        $this->assertInstanceOf(TrackedJob::class, $result);
//    }
//
//    /** @test */
//    public function i_can_go_through_trackable(){
//        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => JobFake::class]);
//
//        $result = JobFake::search()->whereTags(['key1' => 'val1'])->get()->first();
//        $this->assertInstanceOf(TrackedJob::class, $result);
//        $this->assertCount(1, $result->runs());
//        $this->assertEquals($jobStatus->id, $result->latest()->jobStatus()->id);
//    }
//
//    /** @test */
//    public function i_can_go_through_trackable_with_a_job_instance(){
//        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => JobFake::class]);
//
//        $job = new JobFake('alias', ['key1' => 'val1']);
//        $result = $job->history();
//        $this->assertInstanceOf(TrackedJob::class, $result);
//        $this->assertCount(1, $result->runs());
//        $this->assertEquals($jobStatus->id, $result->latest()->jobStatus()->id);
//    }
//
//    /** @test */
//    public function i_can_get_the_first_actual_job(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get()->jobOfTypeWithTags('JobClass1', ['key1' => 'val1']);
//
//        $this->assertCount(2, $result->runs());
//        $this->assertInstanceOf(JobRun::class, $result->latest());
//    }
//
//    /** @test */
//    public function i_can_shortcut_getting_the_first_job_result(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get()->firstRun();
//        $this->assertInstanceOf(JobRun::class, $result);
//    }
//
//    /** @test */
//    public function i_can_shortcut_getting_the_first_job_result_from_the_query_builder(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->first();
//        $this->assertInstanceOf(TrackedJob::class, $result);
//    }
//
//
//    /*****************************************************************************************************
//     * Playing with jobs themselves
//     *******************************************************************************************************/
//
//    /** @test */
//    public function i_can_see_the_parent_of_a_job(){
//        $uuid = Str::uuid();
//        JobStatus::factory()->create([
//            'job_class' => 'JobClass1'
//        ]);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get()->firstRun();
//
//
//        $this->assertInstanceOf(JobRun::class, $result);
//    }
//
//    /********************************************************************************************************
//     * More adhoc tests
//     **********************************************************************************************************/
//
//    /** @test */
//    public function different_tags_separate_jobs_into_different_job_lists(){
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);
//        JobStatus::factory()->create(['job_class' => 'JobClass1']);
//
//        $result = (new JobStatusSearcher())->get();
//        $this->assertCount(3, $result->jobs());
//    }
}
