<?php

namespace JobStatus;

use Illuminate\Contracts\Bus\QueueingDispatcher;
use JobStatus\Exception\JobCancelledException;

class Dispatcher extends \Illuminate\Bus\Dispatcher
{

    private function isTracked($job)
    {
        return in_array(Trackable::class, class_uses_recursive($job));
    }

    private function startTracking($job)
    {
        $job->startTracking();
        return $job;
    }

    public function dispatch($command)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return parent::dispatch($command);
    }

    public function dispatchSync($command, $handler = null)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return parent::dispatchSync($command, $handler);
    }

    public function dispatchNow($command, $handler = null)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('started');
        }

        try {
            $result = parent::dispatchNow($command, $handler);
            if($this->isTracked($command)) {
                $command->setJobStatus('succeeded');
            }
        } catch (\Throwable $e) {
            if($this->isTracked($command)) {
                if($e instanceof JobCancelledException) {
                    $command->setJobStatus('cancelled');
                } else {
                    $command->setJobStatus('failed');
                }
            }
            $command->percentage(100);
            throw $e;
        }

        if($this->isTracked($command)) {
            $command->percentage(100);
        }

        return $result;
    }

    public function dispatchToQueue($command)
    {
        if($this->isTracked($command)) {
            $command = $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return parent::dispatchToQueue($command);
    }
}
