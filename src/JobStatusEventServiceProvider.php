<?php

namespace JobStatus;

use Illuminate\Queue\Events\JobExceptionOccurred;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\Events\JobQueued;
use Illuminate\Queue\Events\JobReleasedAfterException;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class JobStatusEventServiceProvider extends ServiceProvider
{

    public function boot()
    {
        Event::listen(JobQueued::class, \JobStatus\Listeners\JobQueued::class);
        Event::listen(JobProcessing::class, \JobStatus\Listeners\JobProcessing::class);
        Event::listen(JobFailed::class, \JobStatus\Listeners\JobFailed::class);
        Event::listen(JobProcessed::class, \JobStatus\Listeners\JobProcessed::class);
        Event::listen(JobReleasedAfterException::class, \JobStatus\Listeners\JobReleasedAfterException::class);
        Event::listen(JobExceptionOccurred::class, \JobStatus\Listeners\JobExceptionOccurred::class);
    }

}
