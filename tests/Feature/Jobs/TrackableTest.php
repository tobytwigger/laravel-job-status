<?php

namespace JobStatus\Tests\Feature\Jobs;

use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Queue\Jobs\DatabaseJob;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\fakes\NonTrackedJobFake;
use JobStatus\Tests\TestCase;

class TrackableTest extends TestCase
{

    /**
     * @test
     * @dataProvider trackableMethods
     */
    public function run_the_trackable_test(string $method){
        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->setCallback(static::class . '@' . $method)
            ->dispatch();
    }

    public function trackableMethods(): array
    {
        return [
            ['status_gets_a_modifier_of_the_job_status'],
            ['getJobStatus_returns_null_if_no_job']
        ];
    }

    /** @test */
    public function search_returns_a_search_for_the_job()
    {
        JobStatus::factory()->count(10)->create(['job_class' => JobFake::class]);
        JobStatus::factory()->count(15)->create(['job_class' => 'AnotherClass']);
        $search = JobFake::search();
        $this->assertInstanceOf(JobStatusSearcher::class, $search);
        $this->assertCount(10, $search->get()->first()->runs());
    }

    /** @test */
    public function search_returns_a_search_for_the_job_and_tags()
    {
        JobStatus::factory()->count(6)->create(['job_class' => JobFake::class]);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')
            ->count(8)->create(['job_class' => JobFake::class]);
        JobStatus::factory()->count(15)->create(['job_class' => 'AnotherClass']);
        $search = JobFake::search(['key1' => 'val1']);
        $this->assertInstanceOf(JobStatusSearcher::class, $search);
        $this->assertCount(8, $search->get()->first()->runs());
    }


    /** @test */
    public function history_gets_a_list_of_the_jobs(){
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        JobStatus::factory()->count(6)->create(['job_class' => JobFake::class]);
        JobStatus::factory()
            ->has(JobStatusTag::factory()->state(['key' => 'my-first-tag', 'value' => 1]), 'tags')
            ->has(JobStatusTag::factory()->state(['key' => 'my-second-tag', 'value' => 'mytag-value']), 'tags')
            ->count(8)->create(['job_class' => JobFake::class]);
        JobStatus::factory()->count(15)->create(['job_class' => 'AnotherClass']);

        $jobs = $job->history();
        $this->assertInstanceOf(TrackedJob::class, $jobs);
        $this->assertCount(8, $jobs->runs());

    }

    public function getJobStatus_returns_null_if_no_job(JobFake $jobFake){
        $jobFake->job = null;
        $this->assertNull($jobFake->getJobStatus());
    }

    public function status_gets_a_modifier_of_the_job_status(JobFake $jobFake){
        $modifier = $jobFake->status();
        $this->assertInstanceOf(JobStatusModifier::class, $modifier);
        $this->assertEQuals($jobFake->job->uuid(), $modifier->getJobStatus()->uuid);
    }

    /** @test */
    public function closure_jobs_still_run(){
        /** @var Dispatcher $dispatcher */
        $dispatcher = app(Dispatcher::class);

        $dispatcher->dispatchSync(new NonTrackedJobFake(static::class . '@closure_jobs_still_run_callback'));

        $this->assertTrue(static::$closureJobRan);
    }

    static $closureJobRan = false;

    public function closure_jobs_still_run_callback()
    {
        static::$closureJobRan = true;
    }

}
