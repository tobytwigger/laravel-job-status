<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use JobStatus\Models\JobStatus;

class ClearJobStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:clear 
                            {--preserve=:Any jobs that were finished less than this number of hours ago will be kept}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear finished job statuses from the database.';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $hours = (int) $this->option('preserve') ?? 0;

        $statuses = JobStatus::whereFinished();
        if ($hours !== 0) {
            $statuses->where('updated_at', '<', now()->subHours($hours));
        }
        $statuses = $statuses->get();

        $this->withProgressBar($statuses, fn (JobStatus $jobStatus) => $jobStatus->delete());
    }
}
