<?php

namespace JobStatus\Tests\Feature\Jobs;

use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Support\Str;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\fakes\NonTrackedJobFake;
use JobStatus\Tests\TestCase;

class TrackableTest extends TestCase
{
    /** @test */
    public function search_returns_a_search_for_the_job()
    {
        JobStatus::factory()->count(10)->create(['class' => JobFake::class, 'alias' => 'jobfake']);
        JobStatus::factory()->count(15)->create(['class' => 'AnotherClass', 'alias' => 'anotherclass']);

        $search = JobFake::search();
        $this->assertInstanceOf(Builder::class, $search);
        $this->assertCount(10, $search->get()->jobs()->first()->runs());
    }

    /** @test */
    public function search_returns_a_search_for_the_job_and_tags()
    {
        JobStatus::factory()->count(6)->create(['class' => JobFake::class, 'alias' => 'jobfake']);
        JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')
            ->count(8)->create(['class' => JobFake::class, 'alias' => 'jobfake']);
        JobStatus::factory()->count(15)->create(['class' => 'AnotherClass', 'alias' => 'jobfake']);
        $search = JobFake::search(['key1' => 'val1']);
        $this->assertInstanceOf(Builder::class, $search);
        $this->assertCount(8, $search->get()->jobs()->first()->runs());
    }

    public function search_returns_a_search_for_the_job_and_tags_with_indexless_tags()
    {
        JobStatus::factory()->count(6)->create(['class' => JobFake::class, 'alias' => 'jobfake']);
        JobStatus::factory()->has(
            JobStatusTag::factory()
                ->state(['key' => 'key1', 'value' => 'val1'])
                ->indexless('keyone-indexless'),
            'tags'
        )
            ->count(8)->create(['class' => JobFake::class, 'alias' => 'jobfake']);

        JobStatus::factory()->count(15)->create(['class' => 'AnotherClass', 'alias' => 'jobfake']);
        $search = JobFake::search(['keyone-indexless', 'key1' => 'val1']);
        $this->assertInstanceOf(Builder::class, $search);
        $this->assertCount(8, $search->get()->jobs()->first()->runs());
    }

    /** @test */
    public function history_gets_a_list_of_the_jobs()
    {
        $job = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        JobStatus::factory()->count(6)->create(['class' => JobFake::class, 'alias' => 'my-fake-job']);
        JobStatus::factory()
            ->has(JobStatusTag::factory()->state(['key' => 'my-first-tag', 'value' => 1]), 'tags')
            ->has(JobStatusTag::factory()->state(['key' => 'my-second-tag', 'value' => 'mytag-value']), 'tags')
            ->count(8)->create(['class' => JobFake::class, 'alias' => 'my-fake-job']);
        JobStatus::factory()->count(15)->create(['class' => 'AnotherClass', 'alias' => 'my-other-fake-job']);

        $jobs = $job->history();
        $this->assertInstanceOf(TrackedJob::class, $jobs);
        $this->assertCount(8, $jobs->runs());
    }

    /** @test */
    public function get_job_status_returns_null_if_no_job_callback()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $jobFake->job = null;
        $this->assertNull($jobFake->getJobStatus());
    }

    /** @test */
    public function get_job_status_returns_a_job_searching_by_id_and_queue()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $uuid = Str::uuid();

        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(55);
        $job->getConnectionName()->willReturn('database-test');
        $job->uuid()->willReturn(null);

        $jobStatusJob = JobStatus::factory()->create(['job_id' => 55, 'connection_name' => 'database-test', 'uuid' => null]);
        $jobStatusUuid = JobStatus::factory()->create(['job_id' => 10, 'connection_name' => 'database-not', 'uuid' => $uuid]);

        $jobFake->job = $job->reveal();
        $this->assertInstanceOf(JobStatus::class, $jobFake->getJobStatus());
        $this->assertTrue($jobFake->getJobStatus()->is($jobStatusJob));
    }

    /** @test */
    public function get_job_status_returns_a_job_searching_by_uuid()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $uuid = Str::uuid();

        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(null);
        $job->getConnectionName()->willReturn(null);
        $job->uuid()->willReturn($uuid);

        $jobStatusJob = JobStatus::factory()->create(['job_id' => 55, 'connection_name' => 'database-test', 'uuid' => null]);
        $jobStatusUuid = JobStatus::factory()->create(['job_id' => 10, 'connection_name' => 'database-not', 'uuid' => $uuid]);

        $jobFake->job = $job->reveal();
        $this->assertInstanceOf(JobStatus::class, $jobFake->getJobStatus());
        $this->assertTrue($jobFake->getJobStatus()->is($jobStatusUuid));
    }

    /** @test */
    public function get_job_status_prefers_id_and_connection_over_uuid()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $uuid = Str::uuid();

        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(55);
        $job->getConnectionName()->willReturn('database-test');
        $job->uuid()->willReturn($uuid);

        $jobStatusJob = JobStatus::factory()->create(['job_id' => 55, 'connection_name' => 'database-test', 'uuid' => null]);
        $jobStatusUuid = JobStatus::factory()->create(['job_id' => 10, 'connection_name' => 'database-not', 'uuid' => $uuid]);

        $jobFake->job = $job->reveal();
        $this->assertInstanceOf(JobStatus::class, $jobFake->getJobStatus());
        $this->assertTrue($jobFake->getJobStatus()->is($jobStatusJob));
    }

    /** @test */
    public function get_job_status_returns_null_if_no_job_id_or_uuid_found_in_database()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(55);
        $job->getConnectionName()->willReturn('database-test');
        $job->uuid()->willReturn(Str::uuid());

        $jobFake->job = $job->reveal();
        $this->assertNull($jobFake->getJobStatus());
    }

    /** @test */
    public function get_job_status_returns_null_if_no_job_id_or_uuid_found_in_job()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(null);
        $job->getConnectionName()->willReturn(null);
        $job->uuid()->willReturn(null);

        $jobStatusJob = JobStatus::factory()->create(['job_id' => 55, 'connection_name' => 'database-test', 'uuid' => null]);
        $jobStatusUuid = JobStatus::factory()->create(['job_id' => 10, 'connection_name' => 'database-not', 'uuid' => Str::uuid()]);

        $jobFake->job = $job->reveal();
        $this->assertNull($jobFake->getJobStatus());
    }

    /** @test */
    public function status_gets_a_modifier_of_the_job_status()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $uuid = Str::uuid();
        $job = $this->prophesize(\Illuminate\Contracts\Queue\Job::class);
        $job->getJobId()->willReturn(null);
        $job->getConnectionName()->willReturn(null);
        $job->uuid()->willReturn($uuid);
        $jobFake->job = $job->reveal();

        $jobStatus = JobStatus::factory()->create(['uuid' => $uuid]);

        $modifier = $jobFake->status();
        $this->assertInstanceOf(JobStatusModifier::class, $modifier);
        $this->assertEquals($jobStatus->id, $modifier->getJobStatus()->id);
    }

    /** @test */
    public function closure_jobs_still_run()
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = app(Dispatcher::class);

        $dispatcher->dispatchSync(new NonTrackedJobFake(static::class . '@closure_jobs_still_run_callback'));

        $this->assertTrue(static::$closureJobRan);
    }

    public static $closureJobRan = false;

    public function closure_jobs_still_run_callback()
    {
        static::$closureJobRan = true;
    }

    /** @test */
    public function alias_gets_the_alias_of_the_job()
    {
        $jobFake = (new JobFakeFactory())
            ->setAlias('my-alias')
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $this->assertEquals('my-alias', $jobFake->alias());
    }

    /** @test */
    public function tags_gets_the_tags_from_the_job()
    {
        $jobFake = (new JobFakeFactory())
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'])
            ->create();

        $this->assertEquals(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value'], $jobFake->tags());
    }

    public function tags_gets_the_tags_from_the_job_including_with_indexless_tags()
    {
        $jobFake = (new JobFakeFactory())
            ->setTags(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value', 'tag-three', 'tag-four'])
            ->create();

        $this->assertEquals(['my-first-tag' => 1, 'my-second-tag' => 'mytag-value', 'tag-three', 'tag-four'], $jobFake->tags());
    }
}
