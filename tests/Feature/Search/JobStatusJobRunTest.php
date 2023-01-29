<?php

namespace JobStatus\Tests\Feature\Search;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\Enums\MessageType;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusJobRunTest extends TestCase
{

    /** @test */
    public function hasParent_returns_true_if_a_parent_is_set(){

    }

    /** @test */
    public function hasParent_returns_false_if_a_parent_is_not_set(){

    }

    /** @test */
    public function parent_returns_the_parent(){

    }

    /** @test */
    public function parent_returns_null_if_no_parent(){

    }

    /** @test */
    public function getException_gets_the_exception_all_loaded(){

    }

    /** @test */
    public function jobStatus_gets_the_underlying_job_status_model(){

    }

    /** @test */
    public function signals_gets_all_signals(){

    }

    /** @test */
    public function messagesOfType_gets_all_messages_of_the_given_type(){
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
    public function messages_gets_all_messages(){

    }

    /** @test */
    public function isFinished_returns_if_the_job_has_finished()
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
    public function isFailed_returns_if_the_job_has_failed(){
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
    public function isCancelled_returns_if_the_job_has_been_cancelled(){
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
    public function isQueued_returns_if_the_status_is_queued(){
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
    public function isRunning_returns_true_if_the_status_is_running(){
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
    public function isSuccessful_returns_true_of_the_status_is_successful(){
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
    public function getPercentage_returns_the_percentage(){
        $jobStatus = JobStatus::factory()->create(['percentage' => 55.7]);

        $this->assertEquals(55.7, (new JobRun($jobStatus))->getPercentage());
    }

    /** @test */
    public function getStatus_returns_the_status(){

    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json(){

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
        ], (new JobRun($status))->getTagsAsArray());
    }


}
