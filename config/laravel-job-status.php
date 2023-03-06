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
     |
     |
     | By default, we will only track jobs that run that use the `Trackable` trait.
     |
     | If this is set to true, we will track information about any job with no configuration needed.
     |
     */
    'track_anonymous' => false,

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
            // The full URL to the API, e.g. https://example.com/api. You may also omit the path after the domain and use the prefix instead.
            'base_url' => null,
            // Can be used to append `/api` to the domain. If the `base_url` is https://example.com and the prefix is `api`, the url will be https://example.com/api
            'prefix' => 'api',
            // Whether the API is enabled
            'enabled' => true,
            // What middleware to apply to the API
            // To stop anonymous users accessing public job information, add Auth:API to the middleware array
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
        'middleware' => ['web'],

    ],


    /*
    |--------------------------------------------------------------------------
    | Job Collectors
    |--------------------------------------------------------------------------
    |
    | Configure what information we store from a job
    |
     */

    'collectors' => [
        'messages' => [
            // Whether your job can send messages to your app
            'enabled' => true,
        ],
        'signals' => [
            // Whether your app can send signals to your job
            'enabled' => true,
        ],
        'status_history' => [
            // Whether we store the timeline of the job
            'enabled' => true,
        ],
    ],

];
