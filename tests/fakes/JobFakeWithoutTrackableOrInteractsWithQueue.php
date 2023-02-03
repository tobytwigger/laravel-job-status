<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;

class JobFakeWithoutTrackableOrInteractsWithQueue implements ShouldQueue
{
    use Dispatchable, Queueable;

    public int $maxExceptions = 3;

    public int $tries = 3;

    public function __construct(
        private \Closure|string|null $callback = null,
    ) {
    }

    public function handle()
    {
        if ($this->callback === null) {
            return null;
        }

        return app()->call($this->callback, ['job' => $this]);
    }
}
