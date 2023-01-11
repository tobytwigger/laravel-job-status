<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobStatusResult;
use JobStatus\Search\Result\SameJobList;

class ShowJobStatusSummaryCommand  extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:summary
                            {--class=:The class of the job to show}';

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
        $statuses = $repository->search()->get();
        $data = $statuses->jobs()->map(fn(SameJobList $sameJobList) => [
            $sameJobList->jobClass(),
            collect($sameJobList->tags())->reduce(fn($string, $value, $key) => sprintf('%s%s = %s', $string !== null ? $string . ', ' : '', $key, $value)),
            $this->getStatusCount($sameJobList, 'queued'),
            $this->getStatusCount($sameJobList, 'started'),
            $this->getStatusCount($sameJobList, 'succeeded'),
            $this->getStatusCount($sameJobList, 'failed'),
            $this->getStatusCount($sameJobList, 'cancelled'),
        ]);
        $this->table([
            'Job', 'Tags', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'
        ], $data);

        return static::SUCCESS;
    }

    private function getStatusCount(SameJobList $sameJobList, string $status): int
    {
        return $sameJobList->jobs()->filter(fn(JobStatusResult $jobStatusResult) => $jobStatusResult->jobStatus()->status === $status)->count();
    }

}
