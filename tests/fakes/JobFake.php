<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use JobStatus\Concerns\Trackable;

class JobFake
{
    use Dispatchable, Trackable, InteractsWithQueue;

    public static ?\Closure $canSeeTracking;

    public function __construct(
        private ?string $alias = null,
        private array $tags = [],
        private ?\Closure $callback = null
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


    public static function canSeeTracking($user = null, array $tags = []): bool
    {
        if (isset(static::$canSeeTracking)) {
            return call_user_func(static::$canSeeTracking, $user, $tags);
        }

        return true;
    }
}
