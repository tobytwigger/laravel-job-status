<?php

namespace JobStatus\Tests\Feature;

use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class TrackableTest extends TestCase
{

    /** @test */
    public function it_creates_a_job_status_on_job_dispatch(){
        $this->assertDatabaseCount('job_statuses', 0);

        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ]
        ));

        $this->assertDatabaseHas('job_statuses', [
            'job_class' => JobFake::class,
            'job_alias' => 'my-fake-job'
        ]);

        $this->assertDatabaseHas('job_status_tags', [
            'key' => 'my-first-tag', 'value' => '1'
        ]);
        $this->assertDatabaseHas('job_status_tags', [
            'key' => 'my-second-tag', 'value' => 'mytag-value'
        ]);
    }

}
