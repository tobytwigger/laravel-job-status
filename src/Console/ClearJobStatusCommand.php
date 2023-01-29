<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;

class ClearJobStatusCommand  extends Command
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

        $statuses = JobStatusSearcher::query()
            ->whereFinished();
        if($hours !== 0) {
            $statuses->whereUpdatedBefore(now()->subHours($hours));
        }
        $statuses = $statuses->get()->raw();

        $this->withProgressBar($statuses, fn(JobStatus $jobStatus) => $jobStatus->delete());
    }

}
