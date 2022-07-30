<?php

namespace JobStatus\Exception;

use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobCancelledException extends \Exception
{

    public static function for(JobSignal $jobSignal)
    {
        return new static(
            sprintf('Job stopped with signal %s', $jobSignal->signal)
        );
    }

}
