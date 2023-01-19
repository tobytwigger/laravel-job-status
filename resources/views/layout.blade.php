<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->

    <!-- Style sheets-->
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
