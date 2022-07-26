<?php

namespace JobStatus;

use Carbon\Carbon;
use Illuminate\Support\Str;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
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

    public function message(string $message, string $type = 'info')
    {
        if(!in_array($type, JobMessage::ALLOWED_TYPES)) {
            throw new \Exception(sprintf('Cannot send a message of type %s from the job', $type));
        }
        $this->jobStatus->messages()->create([
            'message' => $message, 'type' => $type
        ]);
    }

    public function line(string $message)
    {
        $this->message($message, 'info');
    }

    public function warningMessage(string $message)
    {
        $this->message($message, 'warning');
    }

    public function successMessage(string $message)
    {
        $this->message($message, 'success');
    }

    public function infoMessage(string $message)
    {
        $this->message($message, 'info');
    }

    public function debugMessage(string $message)
    {
        $this->message($message, 'debug');
    }

    public function errorMessage(string $message)
    {
        $this->message($message, 'error');
    }

    public function percentage(float $percentage)
    {
        $this->jobStatus->percentage = $percentage;
        $this->jobStatus->save();
    }

    public function checkForSignals(): void
    {
        $this->jobStatus->signals()
            ->unread()
            ->get()
            ->each(fn(JobSignal $jobSignal) => $this->fireSignal($jobSignal));
    }

    protected function fireSignal(JobSignal $signal)
    {
        $method = sprintf('on%s', Str::ucfirst(Str::camel($signal->signal)));
        if(method_exists($this, $method)) {
            $this->{$method}($signal->parameters ?? []);
        }

        $signal->handled_at = Carbon::now();
        $signal->save();

        if($signal->cancel_job === true) {
            throw JobCancelledException::for($signal);
        }
    }

}