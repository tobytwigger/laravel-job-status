<?php

namespace JobStatus\Enums;

enum Status: string
{
    case QUEUED = 'queued';

    case STARTED = 'started';

    case CANCELLED = 'cancelled';

    case FAILED = 'failed';

    case SUCCEEDED = 'succeeded';

    /**
     * @return Status[]
     */
    public static function getFinishedStatuses(): array
    {
        return [
            self::FAILED,
            self::CANCELLED,
            self::SUCCEEDED,
        ];
    }

    /**
     * @return Status[]
     */
    public static function getUnfinishedStatuses(): array
    {
        return [
            self::QUEUED,
            self::STARTED,
        ];
    }

    public static function getFinishedUnfailedStatuses()
    {
        return [
            self::CANCELLED,
            self::SUCCEEDED,
        ];
    }

    public static function convertToHuman(Status $enum): string
    {
        return ucfirst($enum->value);
    }
}
