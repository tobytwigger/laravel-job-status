<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Queue;
use JobStatus\Trackable;

class JobFake
{
    use Dispatchable, Trackable;

    public function __construct(
        private ?string $alias = null,
        private array $tags = []
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
        //

//        throw new \Exception();
    }


}
