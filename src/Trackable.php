<?php

namespace JobStatus;

use Carbon\Carbon;
use JobStatus\Models\JobStatus;

trait Trackable
{

    public JobStatus $jobStatus;

    public function startTracking()
    {
        if(!isset($this->jobStatus)) {
            $this->jobStatus = JobStatus::create([
                'job_class' => static::class,
                'job_alias' => $this->alias()
            ]);

            foreach($this->tags() as $key => $value) {
                $this->jobStatus->tags()->create([
                    'key' => $key,
                    'value' => $value
                ]);
            }
        }
    }

    public function alias(): ?string
    {
        return null;
    }

    public function tags(): array
    {
        return [];
    }

    public function setJobStatus(string $status)
    {
        $this->jobStatus->statuses()->create(['status' => $status]);
    }

}
