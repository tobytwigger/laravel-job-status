<?php

namespace JobStatus\Concerns;

use Illuminate\Queue\InteractsWithQueue;
use JobStatus\JobStatusModifier;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\SameJobList;

trait Trackable
{
    use InteractsWithSignals, InteractsWithQueue;

    public ?JobStatus $jobStatus = null;

    public static function search(): JobStatusSearcher
    {
        $search = app(JobStatusSearcher::class)->whereJobClass(static::class);
        return $search;
    }

    public function history(): ?SameJobList
    {
        $search = app(JobStatusSearcher::class)->whereJobClass(static::class);
        foreach($this->tags() as $key => $value) {
            $search->whereTag($key, $value);
        }
        return $search->get()->firstJob();
    }

    public function getJobStatus(): ?JobStatus
    {
        if (!isset($this->jobStatus)) {
            $this->jobStatus = null;
            if($this->job?->uuid()) {
                $this->jobStatus = app(JobStatusRepository::class)->getLatestByUuid($this->job->uuid());
            }
            if($this->jobStatus === null && $this->job?->getJobId()) {
                $this->jobStatus = app(JobStatusRepository::class)->getLatestByQueueReference($this->job->getJobId(), $this->job->getConnectionName());
            }
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

    public static function alias(): ?string
    {
        return null;
    }

    public function tags(): array
    {
        return [];
    }

}
