<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\Models\JobStatus;

class ShowJobStatusSummaryCommand  extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:summary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show a summary of the saved jobs.';

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
        $this->table([
            'Job Alias', 'Tags', 'Status (Summary)'
        ]);
        // Get every job alias and tags.
        $statuses = JobStatus::whereFinished()
            ->when($hours !== 0, fn(Builder $query) => $query->where('updated_at', '<', now()->subHours($hours)))
            ->get();
        $this->withProgressBar($statuses, fn(JobStatus $jobStatus) => $jobStatus->delete());
    }

}
