<?php

namespace JobStatus;

use JobStatus\Models\JobStatus;

class JobStatusRepository
{
    public function getLatestByUuid(string $uuid): ?JobStatus
    {
        return JobStatus::query()->where('uuid', $uuid)->latest()->orderBy('id', 'DESC')->first();
    }

    public function getLatestByQueueReference(string $jobId, string $connectionName): ?JobStatus
    {
        return JobStatus::query()->where('job_id', $jobId)
            ->where('connection_name', $connectionName)
            ->latest()->orderBy('id', 'DESC')->first();
    }
}
