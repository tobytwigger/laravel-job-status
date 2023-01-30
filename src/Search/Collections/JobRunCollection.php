<?php

namespace JobStatus\Search\Collections;

use Illuminate\Support\Collection;
use JobStatus\Search\Result\JobRun;

class JobRunCollection extends Collection
{
    public function latest(): ?JobRun
    {
        return $this->sortByDesc(fn (JobRun $jobRun) => $jobRun->jobStatus()->created_at)
            ->first();
    }
}
