<?php

namespace JobStatus\Tests\Unit\Search\Result;

use JobStatus\Enums\Status;
use JobStatus\Models\JobException;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\TestCase;

class TrackedJobTest extends TestCase
{
    /** @test */
    public function alias_returns_the_alias()
    {
        $job = new TrackedJob('JobClass', 'job-alias');
        $this->assertEquals('job-alias', $job->alias());
    }

    /** @test */
    public function class_returns_the_class()
    {
        $job = new TrackedJob('JobClass', 'job-alias');
        $this->assertEquals('JobClass', $job->jobClass());
    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json()
    {
        $failureReasons = [
            [
                'message' => 'Test One',
                'count' => 2,
            ],
            [
                'message' => 'Test Two',
                'count' => 1,
            ],
        ];

        $job = new TrackedJob('JobClass', 'job-alias', numberOfRuns: 3, failureReasons: $failureReasons,
            countWithStatus: [
                Status::QUEUED->value => 5,
                Status::FAILED->value => 10,
                Status::STARTED->value => 15,
                Status::SUCCEEDED->value => 20,
                Status::CANCELLED->value => 25
            ]);

        $array = [
            'count' => 3,
            'alias' => 'job-alias',
            'class' => 'JobClass',
            'failure_reasons' => $failureReasons,
            'successful' => 20,
            'failed' => 10,
            'started' => 15,
            'queued' => 5,
            'cancelled' => 25
        ];

        $this->assertEquals($array, $job->toArray());
        $this->assertEquals(json_encode($array), $job->toJson());
    }

    /** @test */
    public function get_failure_reasons_gets_all_failure_reasons()
    {
        $failureReasons = [
            [
                'message' => 'Test One',
                'count' => 2,
            ],
            [
                'message' => 'Test Two',
                'count' => 1,
            ],
        ];

        $job = new TrackedJob('JobClass', 'job-alias', failureReasons: $failureReasons);

        $this->assertEquals($failureReasons, $job->getFailureReasons());
    }

    /** @test */
    public function countWithStatus_returns_the_for_the_status()
    {
        $job = new TrackedJob('JobClass', 'job-alias', countWithStatus: [
            Status::QUEUED->value => 5,
            Status::FAILED->value => 10,
            Status::STARTED->value => 15,
            Status::SUCCEEDED->value => 20,
            Status::CANCELLED->value => 25
        ]);

        $this->assertEquals(5, $job->countWithStatus(Status::QUEUED));
        $this->assertEquals(10, $job->countWithStatus(Status::FAILED));
        $this->assertEquals(15, $job->countWithStatus(Status::STARTED));
        $this->assertEquals(20, $job->countWithStatus(Status::SUCCEEDED));
        $this->assertEquals(25, $job->countWithStatus(Status::CANCELLED));

    }
}
