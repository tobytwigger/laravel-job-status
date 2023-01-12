<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use JobStatus\Concerns\Trackable;

class JobFake implements ShouldQueue
{
    use Dispatchable, Trackable, InteractsWithQueue, Queueable;

    public static string|\Closure|null $canSeeTracking;

    public int $maxExceptions = 3;

    public function __construct(
        private ?string $alias = null,
        private array $tags = [],
        private \Closure|string|null $callback = null,
        private array $signals = []
    ) {
    }

    public function alias(): ?string
    {
        return $this->alias;
    }

    public function tags(): array
    {
        return $this->tags;
    }

    public function handle()
    {
        if ($this->callback === null) {
            return null;
        }

        return app()->call($this->callback, ['job' => $this]);
    }

    public function handleSignalCallback(string $signal, array $arguments)
    {
        if(array_key_exists($signal, $this->signals)) {
            app()->call($this->signals[$signal], ['job' => $this, 'parameters' => $arguments]);
        }
    }


    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        if (isset(static::$canSeeTracking)) {
            return call_user_func(static::$canSeeTracking, $user, $tags);
        }

        return true;
    }
}
