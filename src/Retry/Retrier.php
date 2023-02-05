<?php

namespace JobStatus\Retry;

use Illuminate\Support\Facades\Facade;

class Retrier extends Facade
{

    protected static function getFacadeAccessor()
    {
        return JobRetrierFactory::class;
    }

}
