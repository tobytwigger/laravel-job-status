<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use JobStatus\Enums\Status;
use JobStatus\JobStatusRepository;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;

class ShowJobStatusSummaryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:summary
                            {--class= : The class of the job to show}
                            {--alias= : The alias of the job to show}';

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
    public function handle(JobStatusRepository $repository)
    {
        $search = $repository->search();
        if ($this->option('class')) {
            $search->whereJobClass($this->option('class'));
        }
        if ($this->option('alias')) {
            $search->whereJobAlias($this->option('alias'));
        }
        $statuses = $search->get();

        $data = $statuses->jobs()->map(fn (TrackedJob $sameJobList) => [
            $sameJobList->jobClass(),
            $this->getStatusCount($sameJobList, Status::QUEUED),
            $this->getStatusCount($sameJobList, Status::STARTED),
            $this->getStatusCount($sameJobList, Status::SUCCEEDED),
            $this->getStatusCount($sameJobList, Status::FAILED),
            $this->getStatusCount($sameJobList, Status::CANCELLED),
        ]);
        $this->table([
            'Job', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled',
        ], $data);

        return static::SUCCESS;
    }

    private function getStatusCount(TrackedJob $sameJobList, Status $status): int
    {
        return $sameJobList->runs()->filter(fn (JobRun $jobStatusResult) => $jobStatusResult->getStatus() === $status)->count();
    }
}
