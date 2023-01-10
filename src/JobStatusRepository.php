<?php

namespace JobStatus;

use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;

class JobStatusRepository
{

    public function getLatestByUuid(string $uuid): ?JobStatus
    {
        return JobStatus::query()->where('uuid', $uuid)->latest()->orderBy('id', 'DESC')->first();
    }

    public function search(): JobStatusSearcher
    {
        return new JobStatusSearcher();
    }

}
