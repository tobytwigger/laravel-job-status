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

class JobStatusTrackedJobTest extends TestCase
{

    /** @test */
    public function runs_returns_the_runs(){
        $this->markTestIncomplete('Not implemented yet');
    }

    /** @test */
    public function alias_returns_the_alias(){
        $this->markTestIncomplete('Not implemented yet');
    }

    /** @test */
    public function jobAlias_returns_the_alias(){
        $this->markTestIncomplete('Not implemented yet');
    }

    /** @test */
    public function latest_returns_the_latest_run(){
        $this->markTestIncomplete('Not implemented yet');
    }

    /** @test */
    public function numberOfRuns_returns_the_number_of_runs(){
        $this->markTestIncomplete('Not implemented yet');
    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json(){
        $this->markTestIncomplete('Not implemented yet');
    }
}
