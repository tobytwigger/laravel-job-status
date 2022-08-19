<?php

namespace JobStatus;

use Illuminate\Database\Eloquent\Collection;
use JobStatus\Models\JobStatus;

class JobStatusCollection extends Collection
{
    public function countFinished()
    {
        return $this->filter(fn (JobStatus $jobStatus) => $jobStatus->isFinished())->count();
    }

    public function countSuccessful()
    {
        return $this->filter(fn (JobStatus $jobStatus) => $jobStatus->isSuccessful())->count();
    }

    public function countRunning()
    {
        return $this->filter(fn (JobStatus $jobStatus) => $jobStatus->isRunning())->count();
    }

    public function countNotFinished()
    {
        return $this->filter(fn (JobStatus $jobStatus) => !$jobStatus->isFinished())->count();
    }
}
