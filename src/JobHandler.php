<?php

namespace JobStatus;

class JobHandler
{
    public function handle($command)
    {
        return $command->handleWithTracking();
    }
}
