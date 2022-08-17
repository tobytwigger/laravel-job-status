<?php

namespace JobStatus;

use Illuminate\Contracts\Bus\Dispatcher as LaravelDispatcher;
use Illuminate\Support\Traits\ForwardsCalls;
use JobStatus\Exception\JobCancelledException;

class Dispatcher
{
    use ForwardsCalls;

    private LaravelDispatcher $parent;

    public function __construct(LaravelDispatcher $parent)
    {
        $this->parent = $parent;
    }

    public function __call(string $name, array $arguments)
    {
        return $this->forwardCallTo($this->parent, $name, $arguments);
    }

    private function isTracked($job)
    {
        return in_array(Trackable::class, class_uses_recursive($job));
    }

    private function startTracking($job)
    {
        $this->parent->map([get_class($job) => fn($job) => $job->handleWithTracking()]);
        $job->startTracking();
        return $job;
    }

    public function dispatch($command)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return $this->parent->dispatch($command);
    }

    public function dispatchSync($command, $handler = null)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return $this->parent->dispatchSync($command, $handler);
    }

    public function dispatchNow($command, $handler = null)
    {
        if($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }

        return $this->parent->dispatchNow($command, $handler);
    }

    public function dispatchToQueue($command)
    {
        if($this->isTracked($command)) {
            $command = $this->startTracking($command);
            $command->setJobStatus('queued');
        }
        return $this->parent->dispatchToQueue($command);
    }
}
