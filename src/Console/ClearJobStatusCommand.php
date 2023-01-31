<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use JobStatus\Enums\Status;
use JobStatus\Models\JobStatus;

class ClearJobStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:clear 
                            {--preserve=:Any jobs that were finished less than this number of hours ago will be kept}
                            {--trim : Only remove the excess information from jobs and keep the core data}
                            {--keep-failed : Keep all failed jobs}';

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
                          
        $statuses = JobStatus::query();
        if ($this->option('keep-failed')) {
            $statuses->whereStatusIn([Status::SUCCEEDED, Status::CANCELLED]);
        } else {
            $statuses->whereFinished();
        }
        if ($hours !== 0) {
            $statuses->where('updated_at', '<', now()->subHours($hours));
        }
        $statuses = $statuses->get();

        $this->withProgressBar($statuses, function (JobStatus $jobStatus) {
            if ($this->option('trim')) {
                $jobStatus->statuses()->delete();
                $jobStatus->tags()->delete();
                $jobStatus->signals()->delete();
                $jobStatus->messages()->delete();
            } else {
                $jobStatus->delete();
            }
        });
    }
}
