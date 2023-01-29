<?php

namespace JobStatus\Dashboard\Http\Composers;

use Composer\InstalledVersions;
use JobStatus\Dashboard\Utils\Assets;

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
            'version' => $version,
            'assets_in_date' => app(Assets::class)->inDate(),
        ]);
    }
}
