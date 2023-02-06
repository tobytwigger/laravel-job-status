<?php

namespace JobStatus\Dashboard\Http\Composers;

use Composer\InstalledVersions;
use JobStatus\Dashboard\Utils\Assets;
use JobStatus\Dashboard\Utils\InstalledVersion;

class DashboardVariables
{
    public function compose(\Illuminate\View\View  $view)
    {


        $view->with('jobStatusVariables', [
            'path' => config('laravel-job-status.dashboard.path', 'job-status'),
            'domain' => config('laravel-job-status.dashboard.domain', null),
            'version' => app(InstalledVersion::class)->version(),
            'assets_in_date' => app(Assets::class)->inDate(),
        ]);
    }
}
