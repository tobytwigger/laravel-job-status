<?php

namespace JobStatus\Tests\Feature\Search;

use Carbon\Carbon;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\Results;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class JobStatusResultsTest extends TestCase
{
    /** @test */
    public function it_gets_the_first_tracked_job_when_first_called_directly_from_the_searcher()
    {
        $results = new Results(collect([
            $trackedJob1 = new TrackedJob('Class1', collect(), 'alias1'),
            $trackedJob2 = new TrackedJob('Class2', collect(), 'alias2'),
            $trackedJob3 = new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertEquals($trackedJob1, $results->first());
    }

    /** @test */
    public function it_returns_all_jobs()
    {
        $results = new Results(collect([
            $trackedJob1 = new TrackedJob('Class1', collect(), 'alias1'),
            $trackedJob2 = new TrackedJob('Class2', collect(), 'alias2'),
            $trackedJob3 = new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertCount(3, $results->jobs());
        $this->assertEquals($trackedJob1, $results->jobs()[0]);
        $this->assertEquals($trackedJob2, $results->jobs()[1]);
        $this->assertEquals($trackedJob3, $results->jobs()[2]);
    }

    /** @test */
    public function raw_returns_the_job_status_models()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                new JobRun(
                    $jobStatus1 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    new JobRun(
                        $jobStatus2 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        new JobRun(
                            $jobStatus3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                new JobRun(
                    $jobStatus4 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    new JobRun(
                        $jobStatus5 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                new JobRun(
                    $jobStatus6 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertCount(6, $results->raw());
        $this->assertTrue($jobStatus1->is($results->raw()[0]));
        $this->assertTrue($jobStatus2->is($results->raw()[1]));
        $this->assertTrue($jobStatus3->is($results->raw()[2]));
        $this->assertTrue($jobStatus4->is($results->raw()[3]));
        $this->assertTrue($jobStatus5->is($results->raw()[4]));
        $this->assertTrue($jobStatus6->is($results->raw()[5]));
    }

    /** @test */
    public function runs_returns_all_the_runs_ordered_by_created_at_of_the_most_recent_run()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                new JobRun(
                    $jobStatus1 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)]),
                    new JobRun(
                        $jobStatus2 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        new JobRun(
                            $jobStatus3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                new JobRun(
                    $jobStatus4 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    new JobRun(
                        $jobStatus5 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                new JobRun(
                    $jobStatus6 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertCount(3, $results->runs());
        $this->assertTrue($jobStatus4->is($results->runs()[0]->jobStatus()));
        $this->assertTrue($jobStatus6->is($results->runs()[1]->jobStatus()));
        $this->assertTrue($jobStatus1->is($results->runs()[2]->jobStatus()));
    }

    /** @test */
    public function runs_and_retries_gets_the_runs_and_retries_not_grouped()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                $jobRun1 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    $jobRun2 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        $jobRun3 = new JobRun(
                            $jobStatus3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                $jobRun4 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    $jobRun5 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                $jobRun6 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertCount(6, $results->runsAndRetries());
        $this->assertEquals($jobRun1, $results->runsAndRetries()[0]);
        $this->assertEquals($jobRun2, $results->runsAndRetries()[1]);
        $this->assertEquals($jobRun3, $results->runsAndRetries()[2]);
        $this->assertEquals($jobRun4, $results->runsAndRetries()[3]);
        $this->assertEquals($jobRun5, $results->runsAndRetries()[4]);
        $this->assertEquals($jobRun6, $results->runsAndRetries()[5]);
    }

    /** @test */
    public function first_returns_the_first_matching_job()
    {
        $results = new Results(collect([
            $trackedJob1 = new TrackedJob('Class1', collect([
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        new JobRun(
                            JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            $trackedJob2 = new TrackedJob('Class2', collect([
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            $trackedJob3 = new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertEquals($trackedJob1, $results->first());
    }

    /** @test */
    public function count_returns_the_number_of_jobs()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                $jobRun1 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    $jobRun2 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        $jobRun3 = new JobRun(
                            $jobStatus3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                $jobRun4 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    $jobRun5 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                $jobRun6 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
                $jobRun7 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertEquals(3, $results->count());
    }

    /** @test */
    public function run_count_returns_the_number_of_runs_excluding_retries()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                $jobRun1 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    $jobRun2 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        $jobRun3 = new JobRun(
                            $jobStatus3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                $jobRun4 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    $jobRun5 = new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                $jobRun6 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
                $jobRun7 = new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $this->assertEquals(4, $results->runCount());
    }

    /** @test */
    public function first_run_gets_the_first_matching_run()
    {
        $results = new Results(collect([
            new TrackedJob('Class1', collect([
                new JobRun(
                    $jobStatus1 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]),
                    new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]),
                        new JobRun(
                            JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)])
                        ),
                    )
                ),
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(4)]),
                    new JobRun(
                        JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(5)])
                    )
                ),
            ]), 'alias1'),
            new TrackedJob('Class2', collect([
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            new TrackedJob('Class3', collect(), 'alias3'),
        ]));
        $this->assertTrue($jobStatus1->is($results->firstRun()->jobStatus()));
    }

    /** @test */
    public function it_can_convert_to_an_array_and_json()
    {
        $results = new Results(collect([
            $trackedJob1 = new TrackedJob('Class2', collect([
                new JobRun(
                    JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(6)])
                ),
            ]), 'alias2'),
            $trackedJob2 = new TrackedJob('Class3', collect(), 'alias3'),
        ]));

        $array = [
            'count' => 2,
            'jobs' => [
                $trackedJob1->toArray(),
                $trackedJob2->toArray(),
            ],
        ];

        $this->assertEquals($array, $results->toArray());

        $this->assertEquals(collect($array)->toJson(), $results->toJson());
    }
}
