<?php

namespace JobStatus\Retry;

use Illuminate\Contracts\Encryption\Encrypter;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Queue;
use JobStatus\Enums\Status;
use JobStatus\Exceptions\CannotBeRetriedException;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;

class JobRetrier
{
    private JobStatus $jobStatus;

    public function __construct(JobStatus $jobStatus)
    {
        $this->jobStatus = $jobStatus;
    }

    public function retry(): void
    {
        if (!empty($this->emptyRequiredFields())) {
            throw new CannotBeRetriedException('All the following fields must be given: ' . implode(', ', $this->emptyRequiredFields()));
        }

        $jobId = Queue::connection($this->jobStatus->connection_name)->pushRaw(
            $this->preparePayloadForRefresh(),
            $this->jobStatus->queue
        );

        if($jobId === null) {
            throw CannotBeRetriedException::reason('The queue must return an ID when job pushed, none returned. The driver you are using is probably not supported.');
        }

        $retryJobStatus = JobStatus::create([
            'class' => $this->jobStatus->class,
            'alias' => $this->jobStatus->alias,
            'percentage' => 0,
            'status' => Status::QUEUED,
            'uuid' => $this->jobStatus->uuid,
            'job_id' => $jobId,
            'connection_name' => $this->jobStatus->connection_name,
            'exception_id' => null,
            'started_at' => null,
            'finished_at' => null,
            'public' => $this->jobStatus->public,
            'batch_id' => $this->jobStatus->batch_id,
            'queue' => $this->jobStatus->queue,
            'payload' => $this->jobStatus->payload,
        ]);

        $modifier = new JobStatusModifier($retryJobStatus);

        $modifier->setStatus(Status::QUEUED);
        foreach ($this->jobStatus->tags as $tag) {
            $retryJobStatus->tags()->create([
                'is_indexless' => $tag->is_indexless,
                'key' => $tag->key,
                'value' => $tag->value,
            ]);
        }

        foreach ($this->jobStatus->users as $user) {
            $modifier->grantAccessTo($user->user_id);
        }
    }

    private function preparePayloadForRefresh(): string
    {
        $payload = $this->jobStatus->payload;

        if (! isset($payload['data']['command'])) {
            return json_encode($payload);
        }

        if (str_starts_with($payload['data']['command'], 'O:')) {
            $instance = unserialize($payload['data']['command']);
        } elseif (App::bound(Encrypter::class)) {
            $instance = unserialize(App::make(Encrypter::class)->decrypt($payload['data']['command']));
        }

        if (! isset($instance)) {
            throw new RuntimeException('Unable to extract job payload for refresh.');
        }

        if (is_object($instance) && ! $instance instanceof \__PHP_Incomplete_Class && method_exists($instance, 'retryUntil')) {
            $retryUntil = $instance->retryUntil();

            $payload['retryUntil'] = $retryUntil instanceof \DateTimeInterface
                ? $retryUntil->getTimestamp()
                : $retryUntil;
        }

        if (isset($payload['attempts'])) {
            $payload['attempts'] = 0;
        }

        return json_encode($payload);
    }

    private function emptyRequiredFields(): array
    {
        $fields = [];
        if($this->jobStatus->connection_name === null) {
            $fields[] = 'Connection name';
        }
        if($this->jobStatus->queue === null) {
            $fields[] = 'Queue';
        }
        if($this->jobStatus->payload === null) {
            $fields[] = 'Payload';
        }
        if(in_array($this->jobStatus->connection_name, ['sync'])) {
            $fields[] = 'Unsupported driver';
    }
        return $fields;
    }
}
