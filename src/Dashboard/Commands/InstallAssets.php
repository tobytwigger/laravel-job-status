<?php

namespace JobStatus\Dashboard\Commands;

use Illuminate\Console\Command;
use JobStatus\Dashboard\Utils\Assets;

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

    private Assets $assets;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Assets $assets)
    {
        $this->output(fn () => $this->line('Clearing old assets'));

        if ($assets->clear()) {
            $this->output(fn () => $this->info('Old assets cleared'));
        } else {
            $this->output(fn () => $this->warn('No assets need clearing'));
        }

        $this->output(fn () => $this->line('Installing assets'));

        $assets->publish();

        $this->output(fn () => $this->info('Installed assets'));

        return Command::SUCCESS;
    }

    private function output(callable $write)
    {
        if (!$this->option('silent')) {
            $write();
        }
    }
}
