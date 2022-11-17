<?php

namespace JobStatus\Concerns;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

trait InteractsWithSignals
{

    abstract public function getJobStatus(): JobStatus;

    public function checkForSignals(): void
    {
        $this->getJobStatus()
            ->signals()
            ->unhandled()
            ->get()
            ->each(fn (JobSignal $jobSignal) => $this->fireSignal($jobSignal));
    }

    protected function fireSignal(JobSignal $signal)
    {
        $method = sprintf('on%s', Str::ucfirst(Str::camel($signal->signal)));
        if (method_exists($this, $method)) {
            $this->{$method}($signal->parameters ?? []);
        }

        $signal->handled_at = Carbon::now();
        $signal->save();

        if ($signal->cancel_job === true) {
            throw JobCancelledException::for($signal);
        }
    }
}
