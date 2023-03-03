<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Foundation\Events\Dispatchable;

class FakeEvent
{
    use Dispatchable;

    public string $someParameter;

    public function __construct(string $someParameter)
    {
        $this->someParameter = $someParameter;
    }

}
