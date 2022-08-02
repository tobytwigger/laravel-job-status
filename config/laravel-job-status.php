<?php

return [
    'table_prefix' => 'job_status',
    'routes' => [
        'api' => [
            'prefix' => 'api',
            'enabled' => true,
            'middleware' => ['api']
        ]
    ]
];
