<?php

namespace JobStatus\Retry;

use JobStatus\Models\JobStatus;

class JobRetrierFactory
{

    public function for(JobStatus $jobStatus): JobRetrier
    {
        return new JobRetrier($jobStatus);
    }

}
