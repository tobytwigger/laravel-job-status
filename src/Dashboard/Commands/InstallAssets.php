<?php

namespace JobStatus\Dashboard\Commands;

use App\Jobs\JobOne;
use App\Jobs\JobTwo;
use Illuminate\Console\Command;
use Illuminate\Foundation\Console\VendorPublishCommand;
use Illuminate\Support\Facades\Artisan;

class InstallAssets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job:install
                            {--silent : Dont output anything}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install the assets needed for the dashboard to work';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->clearOldAssets();

        $this->installAssets();

        return Command::SUCCESS;
    }

    public function clearOldAssets()
    {
        if(!$this->option('silent')) {
            $this->line('Clearing old assets');
        }

        $path = public_path('vendor/job-status');
        $wasDeleted = $this->deleteDirectory($path);

        if(!$this->option('silent')) {
            if(!$this->deleteDirectory($path)) {
                $this->warn('No assets need clearing.');
            } else {
                $this->info('Old assets cleared');
            }
        }
    }

    public function deleteDirectory(string $path): bool
    {
        if (! is_dir($path)) {
            return false;
        }

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

        return true;
    }

    public function installAssets()
    {
        if(!$this->option('silent')) {
            $this->line('Installing assets');
        }
        Artisan::call(
            VendorPublishCommand::class,
            [
                '--force' => true,
                '--tag' => 'job-status-dashboard'
            ]
        );
        if(!$this->option('silent')) {
            $this->info('Assets installed');
        }
    }

}
