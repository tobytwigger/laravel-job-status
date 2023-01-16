<?php

namespace JobStatus\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use JobStatus\Enums\Status;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRunResult;
use JobStatus\Search\Result\TrackedJob;

class ShowJobStatusSummaryCommand  extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job-status:summary
                            {--class= : The class of the job to show}
                            {--alias= : The alias of the job to show}
                            {--tag=* : Any tags to filter by. Separate the key and the value with a colon.}';

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
        if($this->option('class')) {
            $search->whereJobClass($this->option('class'));
        }
        if($this->option('alias')) {
            $search->whereJobAlias($this->option('alias'));
        }
        if($this->hasTags()) {
            foreach($this->getTags() as $key => $value) {
                $search->whereTag($key, $value);
            }
        }
        $statuses = $search->get();

        $data = $statuses->jobs()->map(fn(TrackedJob $sameJobList) => [
            $sameJobList->jobClass(),
            collect($sameJobList->tags())->reduce(fn($string, $value, $key) => sprintf('%s%s = %s', $string !== null ? $string . ', ' : '', $key, $value)),
            $this->getStatusCount($sameJobList, Status::QUEUED),
            $this->getStatusCount($sameJobList, Status::STARTED),
            $this->getStatusCount($sameJobList, Status::SUCCEEDED),
            $this->getStatusCount($sameJobList, Status::FAILED),
            $this->getStatusCount($sameJobList, Status::CANCELLED),
        ]);
        $this->table([
            'Job', 'Tags', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'
        ], $data);

        return static::SUCCESS;
    }

    private function getStatusCount(TrackedJob $sameJobList, Status $status): int
    {
        return $sameJobList->runs()->filter(fn(JobRunResult $jobStatusResult) => $jobStatusResult->jobStatus()->status === $status)->count();
    }

    private function hasTags(): bool
    {
        return $this->option('tag') && count($this->option('tag')) > 0;
    }

    private function getTags(): array
    {
        $tags = [];
        foreach($this->option('tag') as $tagString) {
            $tagData = explode(':', $tagString);
            $tags[$tagData[0]] = $tagData[1];
        }
        return $tags;
    }

}
