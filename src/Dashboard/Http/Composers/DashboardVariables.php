<?php

namespace JobStatus\Dashboard\Http\Composers;

use Composer\InstalledVersions;

class DashboardVariables
{

    public function compose(\Illuminate\View\View  $view)
    {
        try {
            $version = InstalledVersions::getVersion('twigger/laravel-job-status');
        } catch (\Throwable) {
            $version = 'N/A';
        }
        $view->with('jobStatusVariables', [
            'path' => config('laravel-job-status.dashboard.path', 'job-status'),
            'domain' => config('laravel-job-status.dashboard.domain', null),
            'version' => $version
        ]);
    }

}
