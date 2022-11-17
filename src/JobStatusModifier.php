<?php

namespace JobStatus;

use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;

class JobStatusModifier
{

    private ?JobStatus $jobStatus;

    public function __construct(?JobStatus $jobStatus = null)
    {
        $this->jobStatus = $jobStatus;
    }

    public function getJobStatus(): ?JobStatus
    {
        return $this->jobStatus;
    }

    public function setStatus(string $status): static
    {
        $this->jobStatus->status = $status;
        $this->jobStatus->save();
        $this->jobStatus->statuses()->create(['status' => $status]);
        return $this;
    }

    public function setPercentage(float $percentage): static
    {
        $this->jobStatus->percentage = $percentage;
        $this->jobStatus->save();
        return $this;
    }

    public function message(string $message, string $type = 'info'): static
    {
        if (!in_array($type, JobMessage::ALLOWED_TYPES)) {
            throw new \Exception(sprintf('Cannot send a message of type %s from the job', $type));
        }
        $this->jobStatus->messages()->create([
            'message' => $message, 'type' => $type,
        ]);
        return $this;
    }

    public function line(string $message): static
    {
        $this->message($message, 'info');
        return $this;
    }

    public function warningMessage(string $message): static
    {
        $this->message($message, 'warning');
        return $this;
    }

    public function successMessage(string $message): static
    {
        $this->message($message, 'success');
        return $this;
    }

    public function infoMessage(string $message): static
    {
        $this->message($message, 'info');
        return $this;
    }

    public function debugMessage(string $message): static
    {
        $this->message($message, 'debug');
        return $this;
    }

    public function errorMessage(string $message): static
    {
        $this->message($message, 'error');
        return $this;
    }

}
