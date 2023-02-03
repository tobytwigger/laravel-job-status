<?php

namespace JobStatus\Exceptions;

class CannotBeRetriedException extends \Exception
{

    public function __construct(string $message = "This job cannot be retried", int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

}
