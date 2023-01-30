<?php

namespace JobStatus\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Queue\InteractsWithQueue;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\TrackedJob;

trait Trackable
{
    use InteractsWithSignals, InteractsWithQueue;

    public ?JobStatus $jobStatus = null;

    public function getJobStatusConfiguration(): array
    {
        return [];
    }

    public static function search(array $tags = []): Builder
    {
        $search = JobStatus::whereClass(static::class);
        foreach ($tags as $key => $value) {
            $search->whereTag($key, $value);
        }

        return $search;
    }

    public function history(): ?TrackedJob
    {
        return static::search($this->tags())
            ->get()->jobs()->first();
    }

    public function getJobStatus(): ?JobStatus
    {
        if (!isset($this->jobStatus)) {
            $this->jobStatus = null;
            if ($this->job?->getJobId()) {
                $this->jobStatus = app(JobStatusRepository::class)->getLatestByQueueReference($this->job->getJobId(), $this->job->getConnectionName());
            }
            if ($this->jobStatus === null && $this->job?->uuid()) {
                $this->jobStatus = app(JobStatusRepository::class)->getLatestByUuid($this->job->uuid());
            }
        }

        return $this->jobStatus;
    }

    public function status(): JobStatusModifier
    {
        if ($this->getJobStatus() === null) {
            throw new \Exception('Could not get the status of the job');
        }

        return new JobStatusModifier($this->getJobStatus());
    }

    public function alias(): ?string
    {
        return get_class($this);
    }

    public function tags(): array
    {
        return [];
    }

    public function users(): array
    {
        return [];
    }

    public function public(): bool
    {
        return true;
    }
}
