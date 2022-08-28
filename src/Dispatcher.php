<?php

namespace JobStatus;

use Illuminate\Bus\Dispatcher as LaravelDispatcher;
use Illuminate\Contracts\Bus\Dispatcher as LaravelDispatcherContract;
use Illuminate\Support\Traits\ForwardsCalls;

class Dispatcher implements LaravelDispatcherContract, \Illuminate\Contracts\Bus\QueueingDispatcher
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

    /**
     * @param array $pipes
     * @return LaravelDispatcherContract
     */
    public function pipeThrough(array $pipes): LaravelDispatcherContract
    {
        return $this->parent->pipeThrough($pipes);
    }

    /**
     * @param array $map
     * @return LaravelDispatcherContract
     */
    public function map(array $map): LaravelDispatcherContract
    {
        return $this->parent->map($map);
    }

    public function findBatch(string $batchId)
    {
        return $this->parent->findBatch($batchId);
    }

    public function batch($jobs)
    {
        return $this->parent->batch($jobs);
    }
}
