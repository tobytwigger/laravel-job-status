<?php

namespace JobStatus\Dashboard\Utils;

use Composer\InstalledVersions;

class InstalledVersion
{
    public function version(): string
    {
        try {
            return InstalledVersions::getVersion('twigger/laravel-job-status');
        } catch (\Throwable) {
            return 'N/A';
        }
    }
}
