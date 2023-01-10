<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobStatusResult;
use JobStatus\Search\Result\SameJobList;
use JobStatus\Search\Result\SameJobTypeList;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusResultsTest extends TestCase
{

    /************************************************************************
     * Full run through when you have multiple types of a job (e.g. haven't filtered tight enough)
     ************************************************************************/

    /** @test */
    public function i_can_filter_by_type_and_tags(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get()->jobOfTypeWithTags('JobClass1', ['key1' => 'val1']);
        $this->assertInstanceOf(SameJobList::class, $result);
        $this->assertEquals(['key1' => 'val1'], $result->tags());
    }

    /** @test */
    public function i_can_shortcut_getting_the_first_job(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get()->firstJob();
        $this->assertInstanceOf(SameJobList::class, $result);
    }

    /** @test */
    public function i_can_go_through_trackable(){
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => JobFake::class]);

        $result = JobFake::search()->whereTags(['key1' => 'val1'])->get()->firstJob();
        $this->assertInstanceOf(SameJobList::class, $result);
        $this->assertCount(1, $result->jobs());
        $this->assertEquals($jobStatus->id, $result->first()->jobStatus()->id);
    }

    /** @test */
    public function i_can_go_through_trackable_with_a_job_instance(){
        $jobStatus = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => JobFake::class]);

        $job = new JobFake('alias', ['key1' => 'val1']);
        $result = $job->history();
        $this->assertInstanceOf(SameJobList::class, $result);
        $this->assertCount(1, $result->jobs());
        $this->assertEquals($jobStatus->id, $result->first()->jobStatus()->id);
    }

    /** @test */
    public function i_can_get_the_first_actual_job(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get()->jobOfTypeWithTags('JobClass1', ['key1' => 'val1']);

        $this->assertCount(2, $result->jobs());
        $this->assertInstanceOf(JobStatusResult::class, $result->first());
    }

    /** @test */
    public function i_can_shortcut_getting_the_first_job_result(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get()->first();
        $this->assertInstanceOf(JobStatusResult::class, $result);
    }


    /*****************************************************************************************************
     * Playing with jobs themselves
     *******************************************************************************************************/

    /** @test */
    public function i_can_see_the_parent_of_a_job(){
        $uuid = Str::uuid();
        JobStatus::factory()->create([
            'job_class' => 'JobClass1'
        ]);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get()->first();


        $this->assertInstanceOf(JobStatusResult::class, $result);
    }

    /********************************************************************************************************
     * More adhoc tests
     **********************************************************************************************************/

    /** @test */
    public function different_tags_separate_jobs_into_different_job_lists(){
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->create(['job_class' => 'JobClass1']);
        JobStatus::factory()->create(['job_class' => 'JobClass1']);

        $result = (new JobStatusSearcher())->get();
        $this->assertCount(3, $result->jobs());
    }
}
