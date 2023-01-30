<?php

namespace JobStatus\Search\Collections;

use Illuminate\Support\Collection;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;

class JobRunCollection extends Collection
{

    public function latest(): ?JobRun
    {
        return $this->sortByDesc(fn(JobRun $jobRun) => $jobRun->jobStatus()->created_at)
            ->first();
    }


}
