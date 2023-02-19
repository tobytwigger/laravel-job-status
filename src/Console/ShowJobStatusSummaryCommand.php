<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use JobStatus\Enums\Status;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
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
        $statuses = JobStatus::when(
            $this->option('class'),
            fn(Builder $query) => $query->where('class', $this->option('class'))
        )
            ->when(
                $this->option('alias'),
                fn(Builder $query) => $query->where('alias', $this->option('alias'))
            )
            ->orderBy('class')
            ->get();

        $data = $statuses->jobs()->map(fn(TrackedJob $trackedJob) => array_merge(
            [
                $trackedJob->jobClass(),
            ],
            collect(Status::cases())->filter(fn(Status $status) => $status !== Status::RELEASED)->map(fn(Status $enum) => $this->getStatusCount($trackedJob, $enum))->toArray()
        ));
        $this->table(array_merge(
            [
                'Job'
            ],
            collect(Status::cases())->filter(fn(Status $status) => $status !== Status::RELEASED)->map(fn(Status $enum) => Status::convertToHuman($enum))->toArray()
        ), $data);

        return static::SUCCESS;
    }

    private function getStatusCount(TrackedJob $trackedJob, Status $status): int
    {
        return $trackedJob->runs()->filter(fn(JobRun $jobStatusResult) => $jobStatusResult->getStatus() === $status)->count();
    }
}
