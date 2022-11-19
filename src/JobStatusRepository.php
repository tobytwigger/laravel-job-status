<?php

namespace JobStatus;

use JobStatus\Models\JobStatus;

class JobStatusRepository
{

    public function getLatestByUuid(string $uuid): ?JobStatus
    {
        return JobStatus::query()->where('uuid', $uuid)->latest()->orderBy('id', 'DESC')->first();
    }

}
