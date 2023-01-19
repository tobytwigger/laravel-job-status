<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Enabled
    |--------------------------------------------------------------------------
    |
    | If this package is disabled, no information will be stored in the database.
    */

    'enabled' => true,

    /*
    |--------------------------------------------------------------------------
    | Table Prefix
    |--------------------------------------------------------------------------
    |
    | Set to prefix all tables with something. Leave empty to name the tables without a prefix
    |
    | Warning: If this value changes, you will need to change the name of the database tables since the table name
    | will not be automatically updated.
    */

    'table_prefix' => 'job_status',

    /*
    |--------------------------------------------------------------------------
    | Route information
    |--------------------------------------------------------------------------
    |
    | Configuration around the routes this package publishes
    |
    */

    'routes' => [
        'api' => [
            // A prefix for all the API routes
            'prefix' => 'api',
            // Whether the API is enabled
            'enabled' => true,
            // What middleware to apply to the API
            'middleware' => ['api'],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Dashboard information
    |--------------------------------------------------------------------------
    |
    | Configuration around the dashboard to view job history
    |
    */

    'dashboard' => [
        'enabled' => true,

        // The domain the dashboard is on, or null to host on the main app domain
        'domain' => null,

        // The path where the dashboard will be accessible from.
        'path' => 'job-status',

        // These middleware will get attached onto each route of laravel job status
        'middleware' => ['web']

    ],

];
