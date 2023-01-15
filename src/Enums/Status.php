<?php

namespace JobStatus\Enums;

enum Status: string
{

    case QUEUED = 'queued';

    case STARTED = 'started';

    case CANCELLED = 'cancelled';

    case FAILED = 'failed';

    case SUCCEEDED = 'succeeded';

    public static function isFinished(string $getStatus): bool
    {

    }
}
