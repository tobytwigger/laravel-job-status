<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Events\QueuedClosure;
use Illuminate\Queue\DatabaseQueue;
use Illuminate\Support\Facades\Artisan;
use Opis\Closure\SerializableClosure;

class JobFakeFactory
{

    private ?string $alias = null;

    private ?array $tags = [];

    private \Closure|string|null $callback = null;

    private ?\Closure $canSeeTracking = null;

    private array $signals = [];

    /**
     * @return string|null
     */
    public function getAlias(): ?string
    {
        return $this->alias;
    }

    /**
     * @param string|null $alias
     * @return JobFakeFactory
     */
    public function setAlias(?string $alias): JobFakeFactory
    {
        $this->alias = $alias;
        return $this;
    }

    /**
     * @return array|null
     */
    public function getTags(): ?array
    {
        return $this->tags;
    }

    /**
     * @param array|null $tags
     * @return JobFakeFactory
     */
    public function setTags(?array $tags): JobFakeFactory
    {
        $this->tags = $tags;
        return $this;
    }

    /**
     * @return \Closure|null
     */
    public function getCallback(): ?\Closure
    {
        return $this->callback;
    }

    /**
     * @param \Closure|null $callback
     * @return JobFakeFactory
     */
    public function setCallback(\Closure|string|null $callback): JobFakeFactory
    {
        $this->callback = $callback;
        return $this;
    }

    /**
     * @return \Closure|null
     */
    public function getCanSeeTracking(): ?\Closure
    {
        return $this->canSeeTracking;
    }

    /**
     * @param \Closure|null $canSeeTracking
     * @return JobFakeFactory
     */
    public function setCanSeeTracking(?\Closure $canSeeTracking): JobFakeFactory
    {
        $this->canSeeTracking = $canSeeTracking;
        return $this;
    }

    public function create(): JobFake
    {
        $job = new JobFake($this->alias, $this->tags, $this->callback, $this->signals);
        if($this->canSeeTracking) {
            $job::$canSeeTracking = $this->canSeeTracking;
        }
        return $job;
    }

    public function dispatch(): void
    {
        app(Dispatcher::class)->dispatchSync($this->create());
    }

    public function handleSignal(string $signal, string $method): static
    {
        $this->signals[$signal] = $method;
        return $this;
    }

}
