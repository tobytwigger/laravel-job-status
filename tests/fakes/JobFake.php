<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use JobStatus\Trackable;
use Laravel\SerializableClosure\SerializableClosure;

class JobFake implements ShouldQueue
{
    use Dispatchable, Trackable, InteractsWithQueue, Queueable;

    public static ?\Closure $canSeeTracking;

    public $tries = 3;

    public ?SerializableClosure $callback;

    public function __construct(
        private ?string $alias = null,
        private array $tags = [],
        ?\Closure $callback = null
    ) {
        $this->callback = $callback === null ? null : new SerializableClosure($callback);
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

        return app()->call($this->callback->getClosure(), ['job' => $this]);
    }


    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        if (isset(static::$canSeeTracking)) {
            return call_user_func(static::$canSeeTracking, $user, $tags);
        }

        return true;
    }
}
