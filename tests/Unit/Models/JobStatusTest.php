<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Search\Collections\JobStatusCollection;
use JobStatus\Tests\TestCase;

class JobStatusTest extends TestCase
{
    /** @test */
    public function it_creates_a_model()
    {
        $attributes = [
            'class' => 'MyJobClass',
            'alias' => 'my-job-alias',
            'percentage' => 55.3,
        ];

        JobStatus::factory()->create($attributes);

        $this->assertDatabaseHas('job_status_job_statuses', $attributes);
    }

    /** @test */
    public function it_has_many_messages()
    {
        $status = JobStatus::factory()->create();
        $messages = JobMessage::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobMessage::factory()->count(10)->create();

        $this->assertEquals(5, $status->messages()->count());
        $retrieved = $status->messages()->orderBy('id')->get();
        foreach ($messages as $message) {
            $this->assertTrue($message->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_signals()
    {
        $status = JobStatus::factory()->create();
        $signals = JobSignal::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobSignal::factory()->count(10)->create();

        $this->assertEquals(5, $status->signals()->count());
        $retrieved = $status->signals;
        foreach ($signals as $signal) {
            $this->assertTrue($signal->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_tags()
    {
        $status = JobStatus::factory()->create();
        $tags = JobStatusTag::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->count(10)->create();

        $this->assertEquals(5, $status->tags()->count());
        $retrieved = $status->tags;
        foreach ($tags as $tag) {
            $this->assertTrue($tag->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_many_statuses()
    {
        $status = JobStatus::factory()->create();
        $statuses = JobStatusStatus::factory()->count(5)->create(['job_status_id' => $status->id]);
        JobStatusStatus::factory()->count(10)->create();

        $this->assertEquals(5, $status->statuses()->count());
        $retrieved = $status->statuses;
        foreach ($statuses as $status) {
            $this->assertTrue($status->is($retrieved->shift()));
        }
    }

    /** @test */
    public function it_has_an_exception()
    {
        $exception = JobException::factory()->create();
        $status = JobStatus::factory()->create(['exception_id' => $exception->id]);
        JobException::factory()->count(10)->create();

        $this->assertTrue($status->exception->is($exception));
    }

    /** @test */
    public function it_saves_the_timestamps_with_milliseconds()
    {
        $now = Carbon::make('1-3-2020 11:30:24.234');
        Carbon::setTestNow($now);
        $exception = JobStatus::factory()->create([
            'started_at' => $now,
            'finished_at' => $now,
        ]);

        $createdAt = $exception->created_at;
        $this->assertEquals(1, $createdAt->day);
        $this->assertEquals(3, $createdAt->month);
        $this->assertEquals(2020, $createdAt->year);
        $this->assertEquals(11, $createdAt->hour);
        $this->assertEquals(30, $createdAt->minute);
        $this->assertEquals(24, $createdAt->second);
        $this->assertEquals(234, $createdAt->millisecond);

        $updatedAt = $exception->updated_at;
        $this->assertEquals(1, $updatedAt->day);
        $this->assertEquals(3, $updatedAt->month);
        $this->assertEquals(2020, $updatedAt->year);
        $this->assertEquals(11, $updatedAt->hour);
        $this->assertEquals(30, $updatedAt->minute);
        $this->assertEquals(24, $updatedAt->second);
        $this->assertEquals(234, $updatedAt->millisecond);

        $startedAt = $exception->started_at;
        $this->assertEquals(1, $startedAt->day);
        $this->assertEquals(3, $startedAt->month);
        $this->assertEquals(2020, $startedAt->year);
        $this->assertEquals(11, $startedAt->hour);
        $this->assertEquals(30, $startedAt->minute);
        $this->assertEquals(24, $startedAt->second);
        $this->assertEquals(234, $startedAt->millisecond);

        $finishedAt = $exception->finished_at;
        $this->assertEquals(1, $finishedAt->day);
        $this->assertEquals(3, $finishedAt->month);
        $this->assertEquals(2020, $finishedAt->year);
        $this->assertEquals(11, $finishedAt->hour);
        $this->assertEquals(30, $finishedAt->minute);
        $this->assertEquals(24, $finishedAt->second);
        $this->assertEquals(234, $finishedAt->millisecond);
    }

    /** @test */
    public function it_has_many_users()
    {
        $status = JobStatus::factory()->create();
        $status1 = JobStatusUser::factory()->create(['user_id' => 1, 'job_status_id' => $status->id]);
        $status2 = JobStatusUser::factory()->create(['user_id' => 2, 'job_status_id' => $status->id]);
        $status3 = JobStatusUser::factory()->create(['user_id' => 3, 'job_status_id' => $status->id]);
        $status4 = JobStatusUser::factory()->create(['user_id' => 4, 'job_status_id' => $status->id]);
        JobStatusStatus::factory()->count(10)->create();

        $this->assertEquals(4, $status->users()->count());
        $retrieved = $status->users()->orderBy('id')->get();
        $this->assertTrue($status1->is($retrieved->shift()));
        $this->assertTrue($status2->is($retrieved->shift()));
        $this->assertTrue($status3->is($retrieved->shift()));
        $this->assertTrue($status4->is($retrieved->shift()));
    }

    /** @test */
    public function it_creates_a_collection_with_job_statuses()
    {
        $status1 = JobStatus::factory()->create();
        $status2 = JobStatus::factory()->create();
        $status3 = JobStatus::factory()->create();
        $status4 = JobStatus::factory()->create();

        $collection = JobStatus::all();
        $this->assertInstanceOf(JobStatusCollection::class, $collection);
        $this->assertCount(4, $collection);
        $this->assertContainsOnlyInstancesOf(JobStatus::class, $collection);
    }
























    /** @test */
    public function it_filters_by_uuid()
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        $set1 = JobStatus::factory()->count(3)->create(['uuid' => $uuid1]);
        $set2 = JobStatus::factory()->count(12)->create(['uuid' => $uuid2]);

        $results = JobStatus::whereUuid($uuid1)->get();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereUuid($uuid2)->get();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_class()
    {
        $set1 = JobStatus::factory()->count(3)->create(['class' => 'MyJobClass']);
        $set2 = JobStatus::factory()->count(12)->create(['class' => 'NotMyJobClass']);

        $results = JobStatus::whereClass('MyJobClass')->get();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereClass('NotMyJobClass')->get();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_alias()
    {
        $set1 = JobStatus::factory()->count(3)->create(['alias' => 'MyJobAlias']);
        $set2 = JobStatus::factory()->count(12)->create(['alias' => 'NotMyJobAlias']);

        $results = JobStatus::whereAlias('MyJobAlias')->get();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereAlias('NotMyJobAlias')->get();
        $this->assertCount(12, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_tags()
    {
        $set1 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val1']), 'tags')->count(3)->create();
        $set2 = JobStatus::factory()->has(JobStatusTag::factory()->state(['key' => 'key1', 'value' => 'val2']), 'tags')->count(7)->create();

        $results = JobStatus::whereTag('key1', 'val1')->get();
        $this->assertCount(3, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereTag('key1', 'val2')->get();
        $this->assertCount(7, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_statuses_in()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = JobStatus::whereStatusIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereStatusIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_statuses_not_in()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::FAILED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));

        $results = JobStatus::whereStatusNotIn([\JobStatus\Enums\Status::SUCCEEDED, \JobStatus\Enums\Status::QUEUED])->get();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());

        $results = JobStatus::whereStatusNotIn([\JobStatus\Enums\Status::FAILED, \JobStatus\Enums\Status::CANCELLED])->get();
        $this->assertCount(6, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());
    }


    /** @test */
    public function it_filters_by_finished_and_not_finished()
    {
        $set1 = JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::SUCCEEDED])
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::FAILED]))
            ->merge(JobStatus::factory()->count(3)->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $set2 = JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::QUEUED])
            ->merge(JobStatus::factory()->count(4)->create(['status' => \JobStatus\Enums\Status::STARTED]));

        $results = JobStatus::whereFinished()->get();
        $this->assertCount(9, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->pluck('id')->sort()->values());

        $results = JobStatus::whereNotFinished()->get();
        $this->assertCount(8, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_filters_by_connected_users()
    {
        $set1 = JobStatus::factory()->has(JobStatusUser::factory()->state(['user_id' => 1]), 'users')
            ->count(3)->create(['public' => false]);
        $set2 = JobStatus::factory()->has(JobStatusUser::factory()->state(['user_id' => 2]), 'users')
            ->count(7)->create(['public' => false]);
        $set3 = JobStatus::factory()->count(4)->create(['public' => true]);

        $results = JobStatus::forUsers(1)->get();
        $this->assertCount(7, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set1->merge($set3)->pluck('id')->sort()->values());

        $results = JobStatus::forUsers(2)->get();
        $this->assertCount(11, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->merge($set3)->pluck('id')->sort()->values());


        $results = JobStatus::forUsers([1,2])->get();
        $this->assertCount(14, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->merge($set1)->merge($set3)->pluck('id')->sort()->values());

        $results = JobStatus::forUsers(3)->get();
        $this->assertCount(4, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set3->pluck('id')->sort()->values());
    }

    /** @test */
    public function without_user_limits_means_all_jobs_can_be_seen()
    {
        $set1 = JobStatus::factory()->has(JobStatusUser::factory()->state(['user_id' => 1]), 'users')
            ->count(3)->create(['public' => false]);
        $set2 = JobStatus::factory()->has(JobStatusUser::factory()->state(['user_id' => 2]), 'users')
            ->count(7)->create(['public' => false]);
        $set3 = JobStatus::factory()->count(4)->create(['public' => true]);

        $results = JobStatus::all();
        $this->assertCount(14, $results);
        $this->assertEquals($results->pluck('id')->sort()->values(), $set2->merge($set1)->merge($set3)->pluck('id')->sort()->values());
    }

    /** @test */
    public function it_has_a_batch()
    {
        $batch = JobBatch::factory()->create();
        $status = JobStatus::factory()->create(['batch_id' => $batch->id]);

        $this->assertInstanceOf(JobBatch::class, $status->batch);
        $this->assertTrue($batch->is($status->batch));
    }

    /** @test */
    public function batch_is_null_if_no_batch_id_set()
    {
        $status = JobStatus::factory()->create(['batch_id' => null]);

        $this->assertNull($status->batch);
    }
}
