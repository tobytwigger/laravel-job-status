<?php

namespace JobStatus\Tests\Feature\Jobs;

use JobStatus\JobStatusModifier;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class MessagesTest extends TestCase
{

    /** @test */
    public function messages_can_be_sent()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@messagesCanBeSentCallback')
            ->dispatch();

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'This is a test message',
            'type' => \JobStatus\Enums\MessageType::INFO
        ]);
    }

    public static function messagesCanBeSentCallback(JobFake $job)
    {
        JobStatusModifier::forJobStatus($job->getJobStatus())->infoMessage('This is a test message');
    }




    /** @test */
    public function the_message_type_can_be_set(){
        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@theMessageTypeCanBeSetCallback')
            ->dispatch();

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'This is a test message',
            'type' => \JobStatus\Enums\MessageType::SUCCESS
        ]);
    }

    public static function theMessageTypeCanBeSetCallback(JobFake $job)
    {
        JobStatusModifier::forJobStatus($job->getJobStatus())->message('This is a test message', \JobStatus\Enums\MessageType::SUCCESS);
    }

}
