<?php

namespace JobStatus\Dashboard\Utils;

use Illuminate\Foundation\Console\VendorPublishCommand;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Assets
{

    public function clear(): bool
    {
        $path = public_path('vendor/job-status');
        if (! is_dir($path)) {
            return false;
        }
        $this->deleteDirectory($path);
        return true;
    }

    public function publish(): void
    {
        Artisan::call(
            VendorPublishCommand::class,
            ['--force' => true, '--tag' => 'job-status-dashboard']
        );
    }

    public function inDate(): bool
    {
        $publishedPath = public_path('vendor/job-status');
        $localPath = __DIR__ . '/../../../public/dashboard';

        return $this->getHashOfPath($publishedPath) === $this->getHashOfPath($localPath);
    }

    private function getFilesFromPath(string $path, string $basePath = null): array
    {
        $paths = [];
        $files = glob($path . '*', GLOB_MARK);
        foreach($files as $file) {
            if (is_dir($file)) {
                $paths = array_merge($paths, $this->getFilesFromPath($file, $basePath ?? $path));
            } else {
                $paths[] = Str::replace($basePath, '', $file);
            }
        }
        return $paths;
    }

    public function getHashOfPath(string $path): string
    {
        return implode(',', $this->getFilesFromPath($path));
    }

    private function deleteDirectory(string $path): void
    {
        $files = glob($path . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                $this->deleteDirectory($file);
            } else {
                unlink($file);
            }
        }

        if (is_dir($path)) {
            rmdir($path);
        }
    }

}
