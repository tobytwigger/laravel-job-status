<?php

namespace JobStatus;

use JobStatus\Models\JobStatus;

class JobStatusRepository
{

    public function getLatestByUuid(string $uuid): ?JobStatus
    {
        return JobStatus::query()->where('uuid', $job->uuid())->latest()->orderBy('id', 'DESC')->first();
    }

}
