<?php

namespace JobStatus\Tests\Unit;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Tests\TestCase;

class JobStatusRepositoryTest extends TestCase
{

    /** @test */
    public function it_gets_a_searcher(){
        $repo = new JobStatusRepository();
        $this->assertInstanceOf(JobStatusSearcher::class, $repo->search());
    }

    /** @test */
    public function it_gets_the_latest_job_status_by_uuid(){
        $uuid = Str::uuid();
        $now = Carbon::now();
        $job1 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);
        $job2 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now->subHour()]);

        $repo = new JobStatusRepository();
        $this->assertTrue(
            $job1->is(
                $repo->getLatestByUuid($uuid)
            )
        );
    }

    /** @test */
    public function it_orders_the_latest_job_status_by_uuid_by_id_if_created_at_is_the_same(){
        $uuid = Str::uuid();
        $now = Carbon::now();
        $job1 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);
        $job2 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);

        $repo = new JobStatusRepository();
        $this->assertTrue(
            $job2->is(
                $repo->getLatestByUuid($uuid)
            )
        );
    }


    /** @test */
    public function it_gets_the_latest_job_status_by_id_and_connection(){
        $this->markTestIncomplete();
        $uuid = Str::uuid();
        $now = Carbon::now();
        $job1 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);
        $job2 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now->subHour()]);

        $repo = new JobStatusRepository();
        $this->assertTrue(
            $job1->is(
                $repo->getLatestByUuid($uuid)
            )
        );
    }

    /** @test */
    public function it_orders_the_latest_job_status_by_id_and_connection_by_id_if_created_at_is_the_same(){
        $this->markTestIncomplete();
        $uuid = Str::uuid();
        $now = Carbon::now();
        $job1 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);
        $job2 = JobStatus::factory()->create(['uuid' => $uuid, 'created_at' => $now]);

        $repo = new JobStatusRepository();
        $this->assertTrue(
            $job2->is(
                $repo->getLatestByUuid($uuid)
            )
        );
    }

}
