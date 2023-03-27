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
                        {--keep-failed : Keep all failed jobs}
                        {--all : Wipe everything}';

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
        if (!$this->option('all')) {
            if ($this->option('keep-failed')) {
                $statuses->whereStatusIn(Status::getFinishedUnfailedStatuses());
            } else {
                $statuses->whereFinished();
            }
        }

        if ($hours !== 0) {
            $statuses->where('updated_at', '<', now()->subHours($hours));
        }

        $statuses = $statuses->pluck('id');

        $this->withProgressBar($statuses, function (int $jobStatusId) {
            $jobStatus = JobStatus::find($jobStatusId);
            if($jobStatus === null) {
                return;   
            }
            if ($this->option('trim')) {
                $jobStatus->statuses()->delete();
                $jobStatus->signals()->delete();
                $jobStatus->messages()->delete();
            } else {
                $jobStatus->delete();
            }
        });

        return self::SUCCESS;
    }
}
