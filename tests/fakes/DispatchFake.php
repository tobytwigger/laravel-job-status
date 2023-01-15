<?php

namespace JobStatus\Tests\fakes;

class DispatchFake
{

    private bool $queued = false;

    public function queued()
    {
        $this->queued = true;
        return $this;
    }

    public function sync()
    {
        $this->queued = false;
        return $this;
    }

    public function dispatch()
    {
        // Create a job, go through all the right setup
        //
    }
}
