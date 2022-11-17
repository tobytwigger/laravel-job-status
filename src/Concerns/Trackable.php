<?php

namespace JobStatus\Concerns;

use JobStatus\JobStatusModifier;
use JobStatus\Models\JobStatus;

trait Trackable
{
    use InteractsWithSignals;

    public ?JobStatus $jobStatus = null;

    public function getJobStatus(): JobStatus
    {
        if (!isset($this->jobStatus)) {
            $this->jobStatus = JobStatus::where('uuid', $this->job->uuid())->latest()->first();
        }

        return $this->jobStatus;
    }

    public function status(): JobStatusModifier
    {
        return new JobStatusModifier($this->getJobStatus());
    }

    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        return true;
    }

    public function alias(): ?string
    {
        return null;
    }

    public function tags(): array
    {
        return [];
    }

}
