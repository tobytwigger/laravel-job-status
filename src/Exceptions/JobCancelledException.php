<?php

namespace JobStatus\Exceptions;

use JobStatus\Models\JobSignal;

class JobCancelledException extends \Exception
{
    public static function for(JobSignal $jobSignal)
    {
        return new self(
            sprintf('Job stopped with signal %s', $jobSignal->signal)
        );
    }
}
