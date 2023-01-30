<?php

namespace JobStatus\Tests\Unit\Search\Collections;

use Carbon\Carbon;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Result\JobRun;
use JobStatus\Tests\TestCase;

class JobRunCollectionTest extends TestCase
{

    /** @test */
    public function it_gets_the_latest_run(){
        $run1 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(3)]);
        $run2 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(2)]);
        $run3 = JobStatus::factory()->create(['created_at' => Carbon::now()->subHours(1)]);

        $collection = new JobRunCollection([
            new JobRun($run1), new JobRun($run2), new JobRun($run3)
        ]);

        $this->assertTrue($run3->is($collection->latest()->jobStatus()));
    }

}
