<?php

namespace JobStatus\Enums;

enum MessageType: string
{

    case SUCCESS = 'success';

    case ERROR = 'error';

    case INFO = 'info';

    case WARNING = 'warning';

    case DEBUG = 'debug';

}
