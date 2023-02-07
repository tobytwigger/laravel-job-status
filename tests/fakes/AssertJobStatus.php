<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Testing\Assert;
use JobStatus\Enums\Status;
use JobStatus\Models\JobStatus;

class AssertJobStatus
{
    private JobStatus $jobStatus;

    public function __construct(JobStatus $jobStatus)
    {
        $this->jobStatus = $jobStatus;
    }

    public function hasClass(string $class)
    {
        Assert::assertEquals($class, $this->jobStatus->class);

        return $this;
    }

    public function hasAlias(string $alias)
    {
        Assert::assertEquals($alias, $this->jobStatus->alias);

        return $this;
    }

    public function hasStatus(Status $status)
    {
        Assert::assertEquals($status, $this->jobStatus->status);

        return $this;
    }

    public function hasPercentage(int $percentage)
    {
        Assert::assertEquals($percentage, $this->jobStatus->percentage);

        return $this;
    }

    public function hasJobId(int|string $jobId)
    {
        Assert::assertEquals($jobId, $this->jobStatus->job_id);

        return $this;
    }

    public function hasConnectionName(string $connectionName)
    {
        Assert::assertEquals($connectionName, $this->jobStatus->connection_name);

        return $this;
    }

    public function hasBatchId(string $batchId)
    {
        Assert::assertEquals($batchId, $this->jobStatus->batch->batch_id);

        return $this;
    }

    public function hasNonNullUuid()
    {
        Assert::assertNotNull($this->jobStatus->uuid);

        return $this;
    }

    public function hasUuid(string|null $uuid = null)
    {
        Assert::assertEquals($uuid, $this->jobStatus->uuid);

        return $this;
    }

    public function withTags(array $tags)
    {
        Assert::assertCount(count($tags), $this->jobStatus->tags);
        $i = 0;
        foreach ($tags as $key => $value) {
            Assert::assertEquals($key, $this->jobStatus->tags[$i]->key);
            Assert::assertEquals($value, $this->jobStatus->tags[$i]->value);
            $i++;
        }

        return $this;
    }

    public function isUnprotected(bool $isUnprotected)
    {
        Assert::assertEquals($isUnprotected, $this->jobStatus->is_unprotected);

        return $this;
    }

    public function withMessages(array $messages)
    {
        Assert::assertCount(count($messages), $this->jobStatus->messages);
        $i = 0;
        foreach ($messages as $index => $messageArray) {
            Assert::assertEquals($messageArray['message'], $this->jobStatus->messages[$i]->message);
            Assert::assertEquals($messageArray['type'], $this->jobStatus->messages[$i]->type);
            $i++;
        }

        return $this;
    }

    public function withExceptionMessage(string $message)
    {
        Assert::assertNotNull($this->jobStatus->exception);
        Assert::assertEquals($message, $this->jobStatus->exception->message);

        return $this;
    }

    /**
     * @param Status[] $statuses
     * @return AssertJobStatus
     */
    public function withPastStatuses(array $statuses)
    {
        Assert::assertCount(count($statuses), $this->jobStatus->statuses);
        $i = 0;
        foreach ($statuses as $status) {
            Assert::assertEquals($status, $this->jobStatus->statuses[$i]->status);
            $i++;
        }

        return $this;
    }

    public function withUsers(array $users)
    {
        Assert::assertCount(count($users), $this->jobStatus->users);
        $i = 0;
        foreach ($users as $user) {
            Assert::assertEquals($user, $this->jobStatus->users[$i]->user_id);
            $i++;
        }

        return $this;
    }

    public function withNoException()
    {
        Assert::assertNull($this->jobStatus->exception_id);

        return $this;
    }

    public function hasParentId(int $parentId)
    {
        Assert::assertEquals($parentId, $this->jobStatus->parent_id);

        return $this;
    }

    public function hasQueue(string $queue)
    {
        Assert::assertEquals($queue, $this->jobStatus->queue);

        return $this;
    }

    public function hasPayload()
    {
        Assert::assertNotNull($this->jobStatus->payload);

        return $this;
    }

    public function missingPayload()
    {
        Assert::assertNull($this->jobStatus->payload);

        return $this;
    }
}
