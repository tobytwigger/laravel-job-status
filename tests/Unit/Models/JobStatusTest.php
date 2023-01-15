<?php

namespace JobStatus\Tests\Unit\Models;

use Carbon\Carbon;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusTest extends TestCase
{
    /** @test */
    public function it_creates_a_model()
    {
        $attributes = [
            'job_class' => 'MyJobClass',
            'job_alias' => 'my-job-alias',
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
    public function it_can_scope_for_a_job_class()
    {
        JobStatus::factory()->count(5)->create();
        $status = JobStatus::factory()->create(['job_class' => 'MyJobClass']);

        $retrieved = JobStatus::forJob('MyJobClass')->first();
        $this->assertNotNull($retrieved);
        $this->assertTrue($status->is($retrieved));
    }

    /** @test */
    public function it_can_scope_for_a_job_alias()
    {
        JobStatus::factory()->count(5)->create();
        $status = JobStatus::factory()->create(['job_alias' => 'my-alias']);

        $retrieved = JobStatus::forJobAlias('my-alias')->first();
        $this->assertNotNull($retrieved);
        $this->assertTrue($status->is($retrieved));
    }

    /** @test */
    public function where_tag_can_query_based_on_one_tag()
    {
        $status = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'mykey', 'value' => 'myvalue1']),
            'tags'
        )->has(
            JobStatusTag::factory(['key' => 'mykey2', 'value' => 'myvalue2']),
            'tags'
        )->create();
        $status2 = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'mykey', 'value' => 'myvalue1-2']),
            'tags'
        )->create();

        $this->assertEquals($status->id, JobStatus::whereTag('mykey', 'myvalue1')->first()?->id);
        $this->assertEquals($status->id, JobStatus::whereTag('mykey2', 'myvalue2')->first()?->id);
        $this->assertEquals($status2->id, JobStatus::whereTag('mykey', 'myvalue1-2')->first()?->id);
        $this->assertNull(JobStatus::whereTag('mykey', 'myvalue3')->first());
        $this->assertNull(JobStatus::whereTag('mykey3', 'myvalue1')->first());
    }

    /** @test */
    public function where_tag_can_query_based_on_multiple_tags_with_an_and_operator()
    {
        $status = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'mykey', 'value' => 'myvalue1']),
            'tags'
        )->has(
            JobStatusTag::factory(['key' => 'mykey2', 'value' => 'myvalue2']),
            'tags'
        )->create();
        $status2 = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'mykey', 'value' => 'myvalue1-2']),
            'tags'
        )->create();

        $this->assertEquals($status->id, JobStatus::whereTag('mykey', 'myvalue1')->whereTag('mykey2', 'myvalue2')->first()?->id);
        $this->assertNull(JobStatus::whereTag('mykey', 'myvalue1')->whereTag('mykey2', 'myvalue3')->first());
        $this->assertNull(JobStatus::whereTag('mykey', 'myvalue1')->whereTag('mykey3', 'myvalue2')->first());
    }

    /** @test */
    public function it_can_get_a_status()
    {
        $now = Carbon::now();
        $status = JobStatus::factory()->create(['status' => 'failed']);

        $this->assertEquals('failed', $status->getStatus());
    }

    /** @test */
    public function it_can_query_by_status()
    {
        $status = JobStatus::factory()->create(['status' => 'failed']);

        $this->assertTrue($status->is(
            JobStatus::whereStatus('failed')->first()
        ));
        $this->assertNull(JobStatus::whereStatus('started')->first());
    }

    /** @test */
    public function it_can_query_by_where_not_status()
    {
        $status = JobStatus::factory()->create(['status' => 'failed']);

        $this->assertTrue($status->is(
            JobStatus::whereNotStatus('started')->first()
        ));
        $this->assertNull(JobStatus::whereNotStatus('failed')->first());
    }

    /** @test */
    public function it_can_query_by_many_where_not_status()
    {
        $status = JobStatus::factory()->create(['status' => 'failed']);

        $this->assertTrue($status->is(
            JobStatus::whereNotStatus(['started', 'succeeded', 'queued'])->first()
        ));
        $this->assertNull(JobStatus::whereNotStatus(['started', 'cancelled', 'failed'])->first());
    }

    /** @test */
    public function is_finished_is_true_if_the_job_is_finished()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertFalse($queued->isFinished());
        $this->assertFalse($started->isFinished());
        $this->assertTrue($failed->isFinished());
        $this->assertTrue($cancelled->isFinished());
        $this->assertTrue($succeeded->isFinished());
    }

    /** @test */
    public function is_successful_is_true_if_the_job_is_successful()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertFalse($queued->isSuccessful());
        $this->assertFalse($started->isSuccessful());
        $this->assertFalse($failed->isSuccessful());
        $this->assertFalse($cancelled->isSuccessful());
        $this->assertTrue($succeeded->isSuccessful());
    }

    /** @test */
    public function is_running_is_true_if_the_job_is_running()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertFalse($queued->isRunning());
        $this->assertTrue($started->isRunning());
        $this->assertFalse($failed->isRunning());
        $this->assertFalse($cancelled->isRunning());
        $this->assertFalse($succeeded->isRunning());
    }

    /** @test */
    public function is_queued_is_true_if_the_job_is_queued()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertTrue($queued->isQueued());
        $this->assertFalse($started->isQueued());
        $this->assertFalse($failed->isQueued());
        $this->assertFalse($cancelled->isQueued());
        $this->assertFalse($succeeded->isQueued());
    }

    /** @test */
    public function most_recent_message_returns_the_most_recent_message_excluding_debug_types()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message one']);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message two']);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message three']);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'debug', 'message' => 'Message four']);

        $this->assertEquals($message3->message, $jobStatus->mostRecentMessage());
    }

    /** @test */
    public function most_recent_message_can_return_the_most_recent_debug_message()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message one']);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message two']);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message three']);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'debug', 'message' => 'Message four']);

        $this->assertEquals($message4->message, $jobStatus->mostRecentMessage(true));
    }

    /** @test */
    public function most_recent_message_returns_null_if_no_messages_are_given()
    {
        $jobStatus = JobStatus::factory()->create();

        $this->assertNull($jobStatus->mostRecentMessage());
    }

    /** @test */
    public function messages_of_type_returns_all_messages_matching_the_given_type()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message one']);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'success', 'message' => 'Message two']);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'info', 'message' => 'Message three']);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => 'debug', 'message' => 'Message four']);

        $this->assertCount(2, $jobStatus->messagesOfType('info'));
        $this->assertEquals(['Message one', 'Message three'], $jobStatus->messagesOfType('info')->toArray());
    }

    /** @test */
    public function get_percentage_returns_the_percentage()
    {
        $jobStatus = JobStatus::factory()->create(['percentage' => 55.7]);

        $this->assertEquals(55.7, $jobStatus->getPercentage());
    }

    /** @test */
    public function get_tags_as_array_returns_all_tags_as_an_array()
    {
        $status = JobStatus::factory()->create();
        JobStatusTag::factory()->create(['job_status_id' => $status->id, 'key' => 'colour', 'value' => 'black']);
        JobStatusTag::factory()->create(['job_status_id' => $status->id, 'key' => 'make', 'value' => 'Trek']);
        JobStatusTag::factory()->create(['job_status_id' => $status->id, 'key' => 'wheels', 'value' => '32"']);
        JobStatusTag::factory()->create(['job_status_id' => $status->id, 'key' => 'material', 'value' => 'Aluminium']);
        JobStatusTag::factory()->create(['job_status_id' => $status->id, 'key' => 'pedals', 'value' => 'spd']);
        JobStatusTag::factory()->count(10)->create();

        $this->assertEquals([
            'colour'=> 'black',
            'make'=> 'Trek',
            'wheels'=> '32"',
            'material'=> 'Aluminium',
            'pedals'=> 'spd',
        ], $status->getTagsAsArray());
    }

    /** @test */
    public function can_see_tracking_returns_false_if_the_user_does_not_have_access_to_see_the_tracking()
    {
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'tag1', 'value' => 'val1']),
            'tags'
        )->create(['job_class' => JobFake::class]);

        JobFake::$canSeeTracking = fn ($user, $tags) => false;
        $this->assertFalse($jobStatus->canSeeTracking(55));

        JobFake::$canSeeTracking = fn ($user, $tags) => true;
        $this->assertTrue($jobStatus->canSeeTracking(55));

        JobFake::$canSeeTracking = function ($user, $tags) {
            $this->assertEquals(55, $user);
            $this->assertEquals(['tag1' => 'val1'], $tags);

            return true;
        };
        $this->assertTrue($jobStatus->canSeeTracking(55));
    }

    /** @test */
    public function can_see_tracking_throws_an_exception_if_the_job_class_is_not_real()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('No job of type NotAClass found.');

        $jobStatus = JobStatus::factory()->create(['job_class' => 'NotAClass']);

        $jobStatus->canSeeTracking(55);
    }

    /** @test */
    public function can_see_tracking_throws_an_exception_if_the_job_class_exists_but_does_not_extend_trackable()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Job JobStatus\Tests\TestCase is not trackable.');

        $jobStatus = JobStatus::factory()->create(['job_class' => TestCase::class]);

        $jobStatus->canSeeTracking(55);
    }

    /** @test */
    public function it_can_filter_to_jobs_that_are_finished()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertCount(3, JobStatus::whereFinished()->get());
        $this->assertFalse(JobStatus::whereFinished()->where('id', $queued->id)->exists());
        $this->assertFalse(JobStatus::whereFinished()->where('id', $started->id)->exists());
        $this->assertTrue(JobStatus::whereFinished()->where('id', $failed->id)->exists());
        $this->assertTrue(JobStatus::whereFinished()->where('id', $cancelled->id)->exists());
        $this->assertTrue(JobStatus::whereFinished()->where('id', $succeeded->id)->exists());
    }

    /** @test */
    public function it_can_filter_to_jobs_that_are_not_finished()
    {
        $queued = JobStatus::factory()->create(['status' => 'queued']);
        $started = JobStatus::factory()->create(['status' => 'started']);
        $failed = JobStatus::factory()->create(['status' => 'failed']);
        $cancelled = JobStatus::factory()->create(['status' => 'cancelled']);
        $succeeded = JobStatus::factory()->create(['status' => 'succeeded']);

        $this->assertCount(3, JobStatus::whereFinished()->get());
        $this->assertTrue(JobStatus::whereNotFinished()->where('id', $queued->id)->exists());
        $this->assertTrue(JobStatus::whereNotFinished()->where('id', $started->id)->exists());
        $this->assertFalse(JobStatus::whereNotFinished()->where('id', $failed->id)->exists());
        $this->assertFalse(JobStatus::whereNotFinished()->where('id', $cancelled->id)->exists());
        $this->assertFalse(JobStatus::whereNotFinished()->where('id', $succeeded->id)->exists());
    }

}
