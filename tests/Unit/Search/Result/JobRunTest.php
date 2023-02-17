<?php

namespace JobStatus\Tests\Unit\Search\Result;

use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Search\Result\JobRun;
use JobStatus\Tests\TestCase;

class JobRunTest extends TestCase
{
    /** @test */
    public function has_parent_returns_true_if_a_parent_is_set()
    {
        $mainJobStatus = JobStatus::factory()->create();
        $parentJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus, new JobRun($parentJobStatus));

        $this->assertTrue($run->hasParent());
    }

    /** @test */
    public function has_parent_returns_false_if_a_parent_is_not_set()
    {
        $mainJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus, null);

        $this->assertFalse($run->hasParent());
    }

    /** @test */
    public function is_a_retry_returns_true_if_a_parent_is_set()
    {
        $mainJobStatus = JobStatus::factory()->create();
        $parentJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus, new JobRun($parentJobStatus));

        $this->assertTrue($run->isARetry());
    }

    /** @test */
    public function is_a_retry_returns_false_if_a_parent_is_not_set()
    {
        $mainJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus, null);

        $this->assertFalse($run->isARetry());
    }

    /** @test */
    public function parent_returns_the_parent()
    {
        $mainJobStatus = JobStatus::factory()->create();
        $parentJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus, new JobRun($parentJobStatus));

        $this->assertTrue($parentJobStatus->is($run->parent()->jobStatus()));
    }

    /** @test */
    public function parent_returns_null_if_no_parent()
    {
        $mainJobStatus = JobStatus::factory()->create();
        $parentJobStatus = JobStatus::factory()->create();

        $run = new JobRun($mainJobStatus);

        $this->assertNull($run->parent());
    }

    /** @test */
    public function get_exception_gets_the_exception_all_loaded()
    {
        $previous1 = JobException::factory()->create();
        $previous2 = JobException::factory()->create(['previous_id' => $previous1->id]);
        $previous3 = JobException::factory()->create(['previous_id' => $previous2->id]);
        $rawException = JobException::factory()->create(['previous_id' => $previous3->id]);

        $jobStatus = JobStatus::factory()->create(['exception_id' => $rawException->id]);

        $run = new JobRun($jobStatus);

        $exception = $run->getException();

        $this->assertInstanceOf(JobException::class, $exception);
        $array = $exception->toArray();
        $this->assertEquals($exception->id, $array['id']);

        $this->assertArrayHasKey('previous', $array);
        $this->assertIsArray($array['previous']);
        $this->assertEquals($previous3->id, $array['previous']['id']);

        $this->assertArrayHasKey('previous', $array['previous']);
        $this->assertIsArray($array['previous']['previous']);
        $this->assertEquals($previous2->id, $array['previous']['previous']['id']);


        $this->assertArrayHasKey('previous', $array['previous']['previous']);
        $this->assertIsArray($array['previous']['previous']['previous']);
        $this->assertEquals($previous1->id, $array['previous']['previous']['previous']['id']);

        $this->assertArrayHasKey('previous', $array['previous']['previous']['previous']);
        $this->assertNull($array['previous']['previous']['previous']['previous']);
    }

    /** @test */
    public function job_status_gets_the_underlying_job_status_model()
    {
        $jobStatus = JobStatus::factory()->create();

        $run = new JobRun($jobStatus);

        $this->assertTrue($jobStatus->is($run->jobStatus()));
    }

    /** @test */
    public function signals_gets_all_signals()
    {
        $jobStatus = JobStatus::factory()->create();
        $signal1 = JobSignal::factory()->create(['signal' => 'one', 'job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subMinute()]);
        $signal2 = JobSignal::factory()->create(['signal' => 'two', 'job_status_id' => $jobStatus->id]);
        $run = new JobRun($jobStatus);
        $this->assertCount(2, $run->signals());
        $this->assertTrue($signal1->is($run->signals()[0]));
        $this->assertTrue($signal2->is($run->signals()[1]));
    }

    /** @test */
    public function messages_of_type_gets_all_messages_of_the_given_type()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message one', 'created_at' => Carbon::now()->subhours(1)]);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::SUCCESS, 'message' => 'Message two', 'created_at' => Carbon::now()->subhours(2)]);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message three', 'created_at' => Carbon::now()->subhours(3)]);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::DEBUG, 'message' => 'Message four', 'created_at' => Carbon::now()->subhours(4)]);

        $this->assertCount(2, (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::INFO));
        $this->assertEquals(['Message one', 'Message three'], (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::INFO)->toArray());

        $this->assertCount(1, (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::SUCCESS));
        $this->assertEquals(['Message two'], (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::SUCCESS)->toArray());

        $this->assertCount(1, (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::DEBUG));
        $this->assertEquals(['Message four'], (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::DEBUG)->toArray());

        $this->assertCount(0, (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::WARNING));
        $this->assertEquals([], (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::WARNING)->toArray());

        $this->assertCount(0, (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::ERROR));
        $this->assertEquals([], (new JobRun($jobStatus))->messagesOfType(\JobStatus\Enums\MessageType::ERROR)->toArray());
    }

    /** @test */
    public function most_recent_message_returns_the_most_recent_message_excluding_debug_types()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message one', 'created_at' => Carbon::now()->subHours(4)]);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message two', 'created_at' => Carbon::now()->subHours(3)]);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message three', 'created_at' => Carbon::now()->subHours(2)]);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::DEBUG, 'message' => 'Message four', 'created_at' => Carbon::now()->subHours(1)]);

        $this->assertEquals($message3->message, (new JobRun($jobStatus))->mostRecentMessage());
        $this->assertEquals($message3->message, (new JobRun($jobStatus))->mostRecentMessage(false));
    }

    /** @test */
    public function most_recent_message_can_return_the_most_recent_debug_message()
    {
        $jobStatus = JobStatus::factory()->create();
        $message = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message one']);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message two']);
        $message3 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::INFO, 'message' => 'Message three']);
        $message4 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'type' => \JobStatus\Enums\MessageType::DEBUG, 'message' => 'Message four']);

        $this->assertEquals($message4->message, (new JobRun($jobStatus))->mostRecentMessage(true));
    }

    /** @test */
    public function most_recent_message_returns_null_if_no_messages_are_given()
    {
        $jobStatus = JobStatus::factory()->create();

        $this->assertNull((new JobRun($jobStatus))->mostRecentMessage());
    }

    /** @test */
    public function messages_gets_all_messages()
    {
        $jobStatus = JobStatus::factory()->create();
        $message1 = JobMessage::factory()->create(['message' => 'one', 'job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subMinute()]);
        $message2 = JobMessage::factory()->create(['message' => 'two', 'job_status_id' => $jobStatus->id]);
        $run = new JobRun($jobStatus);
        $this->assertCount(2, $run->messages());
        $this->assertTrue($message1->is($run->messages()[0]));
        $this->assertTrue($message2->is($run->messages()[1]));
    }

    /** @test */
    public function is_finished_returns_if_the_job_has_finished()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertFalse($queued->isFinished());
        $this->assertFalse($started->isFinished());
        $this->assertTrue($failed->isFinished());
        $this->assertTrue($cancelled->isFinished());
        $this->assertTrue($succeeded->isFinished());
    }

    /** @test */
    public function is_failed_returns_if_the_job_has_failed()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertFalse($queued->isFailed());
        $this->assertFalse($started->isFailed());
        $this->assertTrue($failed->isFailed());
        $this->assertFalse($cancelled->isFailed());
        $this->assertFalse($succeeded->isFailed());
    }

    /** @test */
    public function is_cancelled_returns_if_the_job_has_been_cancelled()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertFalse($queued->isCancelled());
        $this->assertFalse($started->isCancelled());
        $this->assertFalse($failed->isCancelled());
        $this->assertTrue($cancelled->isCancelled());
        $this->assertFalse($succeeded->isCancelled());
    }

    /** @test */
    public function is_queued_returns_if_the_status_is_queued()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertTrue($queued->isQueued());
        $this->assertFalse($started->isQueued());
        $this->assertFalse($failed->isQueued());
        $this->assertFalse($cancelled->isQueued());
        $this->assertFalse($succeeded->isQueued());
    }

    /** @test */
    public function is_running_returns_true_if_the_status_is_running()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertFalse($queued->isRunning());
        $this->assertTrue($started->isRunning());
        $this->assertFalse($failed->isRunning());
        $this->assertFalse($cancelled->isRunning());
        $this->assertFalse($succeeded->isRunning());
    }

    /** @test */
    public function is_successful_returns_true_of_the_status_is_successful()
    {
        $queued = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::QUEUED]));
        $started = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::STARTED]));
        $failed = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::FAILED]));
        $cancelled = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::CANCELLED]));
        $succeeded = new JobRun(JobStatus::factory()->create(['status' => \JobStatus\Enums\Status::SUCCEEDED]));

        $this->assertFalse($queued->isSuccessful());
        $this->assertFalse($started->isSuccessful());
        $this->assertFalse($failed->isSuccessful());
        $this->assertFalse($cancelled->isSuccessful());
        $this->assertTrue($succeeded->isSuccessful());
    }

    /** @test */
    public function get_percentage_returns_the_percentage()
    {
        $jobStatus = JobStatus::factory()->create(['percentage' => 55.7]);

        $this->assertEquals(55.7, (new JobRun($jobStatus))->getPercentage());
    }

    /** @test */
    public function get_status_returns_the_status()
    {
        $jobStatus = JobStatus::factory()->create(['status' => Status::QUEUED]);
        $run = new JobRun($jobStatus);
        $this->assertEquals(Status::QUEUED, $run->getStatus());
    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json()
    {
        $uuid = Str::uuid();

        $createdAt = Carbon::now()->subHour()->setMicroseconds(0);
        $startedAt = Carbon::now()->subHours(6)->setMicroseconds(0);
        $finishedAt = Carbon::now()->subHours(4)->setMicroseconds(0);

        $batch = JobBatch::factory()->create();
        $exception = JobException::factory()->create();
        $jobStatus = JobStatus::factory()->create([
            'alias' => 'my-job-alias',
            'batch_id' => $batch->id,
            'class' => 'My_Fake_Class',
            'percentage' => 30.2,
            'status' => Status::CANCELLED,
            'uuid' => $uuid,
            'created_at' => $createdAt,
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'exception_id' => $exception->id,
            'connection_name' => 'database-test',
            'queue' => 'custom-queue',
            'payload' => ['one'],
        ]);
        $message1 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subMinute()]);
        $message2 = JobMessage::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subHour()]);
        $signal1 = JobSignal::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subMinute()]);
        $signal2 = JobSignal::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subHour()]);
        $status1 = JobStatusStatus::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subMinute()]);
        $status2 = JobStatusStatus::factory()->create(['job_status_id' => $jobStatus->id, 'created_at' => Carbon::now()->subHour()]);

        JobStatusTag::factory()->create(['key' => 'key1', 'value' => 'value1', 'job_status_id' => $jobStatus->id]);
        JobStatusTag::factory()->create(['key' => 'key2', 'value' => 'value2', 'job_status_id' => $jobStatus->id]);

        $parentJob = JobStatus::factory()->create();

        $run = new JobRun($jobStatus, new JobRun($parentJob));

        $array = [
            'alias' => 'my-job-alias',
            'class' => 'My_Fake_Class',
            'percentage' => 30.2,
            'status' => Status::CANCELLED,
            'uuid' => $uuid,
            'has_parent' => true,
            'parent' => (new JobRun($parentJob))->toArray(),
            'tags' => [
                'key1' => 'value1',
                'key2' => 'value2',
            ],
            'created_at' => $createdAt,
            'exception' => $exception->loadAllPrevious()->toArray(),
            'messages' => collect([
                $message1->toArray(), $message2->toArray(),
            ]),
            'signals' => collect([
                $signal1->toArray(), $signal2->toArray(),
            ]),
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'id' => $jobStatus->id,
            'statuses' => collect([
                $status1->toArray(), $status2->toArray(),
            ]),
            'batch_id' => $batch->id,
            'batch_id_uuid' => $batch->batch_id,
            'has_payload' => true,
            'connection_name' => 'database-test',
            'queue' => 'custom-queue',
        ];
        $this->assertEquals($array, $run->toArray());
        $this->assertIsString($run->toJson());
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
        JobStatusTag::factory()->indexless('bicycle')->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->indexless('new')->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->indexless('road')->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->indexless('dispatched')->create(['job_status_id' => $status->id]);
        JobStatusTag::factory()->count(10)->create();

        $this->assertEquals([
            'colour'=> 'black',
            'make'=> 'Trek',
            'wheels'=> '32"',
            'material'=> 'Aluminium',
            'pedals'=> 'spd',
            'bicycle',
            'new',
            'road',
            'dispatched',
        ], (new JobRun($status))->getTagsAsArray());
    }

    /** @test */
    public function accessible_by_returns_true_if_the_user_can_see_the_private_job()
    {
        $status = JobStatus::factory()->create(['is_unprotected' => false]);
        JobStatusUser::factory()->create(['job_status_id' => $status->id, 'user_id' => 1]);

        $this->assertTrue((new JobRun($status))->accessibleBy(1));
    }

    /** @test */
    public function accessible_by_returns_false_if_the_user_cannot_see_the_private_job()
    {
        $status = JobStatus::factory()->create(['is_unprotected' => false]);
        JobStatusUser::factory()->create(['job_status_id' => $status->id, 'user_id' => 2]);

        $this->assertFalse((new JobRun($status))->accessibleBy(1));
    }

    /** @test */
    public function accessible_by_returns_true_if_the_job_is_public()
    {
        $status = JobStatus::factory()->create(['is_unprotected' => true]);

        $this->assertTrue((new JobRun($status))->accessibleBy(1));
    }

    /** @test */
    public function it_returns_a_modifier()
    {
        $status = JobStatus::factory()->create();

        $modifier = (new JobRun($status))->modifier();
        $this->assertInstanceOf(JobStatusModifier::class, $modifier);
        $this->assertTrue(
            $status->is(
                $modifier->getJobStatus()
            )
        );
    }
}
