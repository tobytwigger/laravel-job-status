<?php

namespace JobStatus;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Models\JobStatus;

class JobStatusCollection extends Collection
{
    public function countFinished()
    {
        return $this->filter(fn (Model $jobStatus) => $jobStatus instanceof JobStatus && $jobStatus->isFinished())->count();
    }

    public function countSuccessful()
    {
        return $this->filter(fn (Model $jobStatus) => $jobStatus instanceof JobStatus && $jobStatus->isSuccessful())->count();
    }

    public function countRunning()
    {
        return $this->filter(fn (Model $jobStatus) => $jobStatus instanceof JobStatus && $jobStatus->isRunning())->count();
    }

    public function countNotFinished()
    {
        return $this->filter(fn (Model $jobStatus) => $jobStatus instanceof JobStatus && !$jobStatus->isFinished())->count();
    }
}
