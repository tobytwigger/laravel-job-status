<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
{{--    <link rel="shortcut icon" href="{{ asset('/vendor/horizon/img/favicon.png') }}">--}}

    <title>Job Dashboard{{ config('app.name') ? ' - ' . config('app.name') : '' }}</title>

    <!-- Style sheets-->
    <link href="{{ asset(mix('app.css', 'vendor/job-status')) }}" rel="stylesheet">
</head>
<body>
<div id="job-status">
{{--                @if (! $assetsAreCurrent)--}}
{{--                    <div class="alert alert-warning">--}}
{{--                        The published Horizon assets are not up-to-date with the installed version. To update, run:<br/><code>php artisan horizon:publish</code>--}}
{{--                    </div>--}}
{{--                @endif--}}

{{--                @if ($isDownForMaintenance)--}}
{{--                    <div class="alert alert-warning">--}}
{{--                        This application is in "maintenance mode". Queued jobs may not be processed unless your worker is using the "force" flag.--}}
{{--                    </div>--}}
{{--                @endif--}}

                <router-view></router-view>
</div>

<script>
    window.JobStatus = @json($jobStatusVariables);
</script>
<script src="{{asset(mix('app.js', 'vendor/job-status'))}}"></script>
</body>
</html>
