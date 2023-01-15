<?php

namespace JobStatus;

use JobStatus\Enums\MessageType;
use JobStatus\Enums\Status;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;

class JobStatusModifier
{

    private ?JobStatus $jobStatus;

    public static function forJobStatus(?JobStatus $jobStatus): JobStatusModifier
    {
        return new JobStatusModifier($jobStatus);
    }

    public function __construct(?JobStatus $jobStatus = null)
    {
        $this->jobStatus = $jobStatus;
    }

    public function getJobStatus(): ?JobStatus
    {
        return $this->jobStatus;
    }

    public function setStatus(Status $status): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->status = $status;
            $this->jobStatus->save();
            $this->jobStatus->statuses()->create(['status' => $status]);
        }
        return $this;
    }

    public function setPercentage(float $percentage): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->percentage = $percentage;
            $this->jobStatus->save();
        }
        return $this;
    }

    public function message(string $message, MessageType $type = MessageType::INFO): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->messages()->create([
                'message' => $message, 'type' => $type,
            ]);
        }
        return $this;
    }

    public function line(string $message): static
    {
        return $this->infoMessage($message);
    }

    public function warningMessage(string $message): static
    {
        if ($this->jobStatus !== null) {
            $this->message($message, MessageType::WARNING);
        }
        return $this;
    }

    public function successMessage(string $message): static
    {
        if ($this->jobStatus !== null) {
            $this->message($message, MessageType::SUCCESS);
        }
        return $this;
    }

    public function infoMessage(string $message): static
    {
        if ($this->jobStatus !== null) {
            $this->message($message, MessageType::INFO);
        }
        return $this;
    }

    public function debugMessage(string $message): static
    {
        if ($this->jobStatus !== null) {
            $this->message($message, MessageType::DEBUG);
        }
        return $this;
    }

    public function errorMessage(string $message): static
    {
        if ($this->jobStatus !== null) {
            $this->message($message, MessageType::ERROR);
        }
        return $this;
    }

    public function cancel(array $parameters = []): static
    {
        if ($this->jobStatus !== null) {
            return $this->sendSignal('cancel', $parameters, true);
        }
        return $this;
    }

    public function sendSignal(string $signal, array $parameters = [], bool $cancel = false): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->signals()->create([
                'signal' => $signal,
                'cancel_job' => $cancel,
                'parameters' => $parameters,
            ]);
        }
        return $this;
    }

    public function setUuid(?string $uuid): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->uuid = $uuid;
            $this->jobStatus->save();
        }
        return $this;
    }

    public function setJobId(string|int $jobId): static
    {
        if ($this->jobStatus !== null) {
            $this->jobStatus->job_id = $jobId;
            $this->jobStatus->save();
        }
        return $this;
    }

}
