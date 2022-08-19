<?php

namespace JobStatus;

use Illuminate\Contracts\Bus\Dispatcher as LaravelDispatcherContract;
use Illuminate\Support\Traits\ForwardsCalls;

class Dispatcher implements LaravelDispatcherContract
{
    use ForwardsCalls;

    private LaravelDispatcherContract $parent;

    public function __construct(LaravelDispatcherContract $parent)
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
        $this->parent->map([get_class($job) => JobHandler::class]);
        $job->startTracking();

        return $job;
    }

    public function dispatch($command)
    {
        if ($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }

        return $this->parent->dispatch($command);
    }

    public function dispatchSync($command, $handler = null)
    {
        if ($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }

        return $this->parent->dispatchSync($command, $handler);
    }

    public function dispatchNow($command, $handler = null)
    {
        if ($this->isTracked($command)) {
            $this->startTracking($command);
            $command->setJobStatus('queued');
        }

        return $this->parent->dispatchNow($command, $handler);
    }

    public function dispatchToQueue($command)
    {
        if ($this->isTracked($command)) {
            $command = $this->startTracking($command);
            $command->setJobStatus('queued');
        }

        return $this->parent->dispatchToQueue($command);
    }

    public function hasCommandHandler($command)
    {
        return $this->parent->hasCommandHandler($command);
    }

    public function getCommandHandler($command)
    {
        return $this->parent->getCommandHandler($command);
    }

    public function pipeThrough(array $pipes)
    {
        return $this->parent->pipeThrough($pipes);
    }

    public function map(array $map)
    {
        return $this->parent->map($map);
    }
}
