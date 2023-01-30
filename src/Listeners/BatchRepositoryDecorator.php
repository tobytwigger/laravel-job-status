<?php

namespace JobStatus\Listeners;

use Closure;
use Illuminate\Bus\BatchRepository;
use Illuminate\Bus\PendingBatch;
use Illuminate\Routing\Router;
use Illuminate\Support\Traits\ForwardsCalls;
use JobStatus\Concerns\Trackable;
use JobStatus\Enums\Status;
use JobStatus\JobStatusModifier;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

class BatchRepositoryDecorator extends BaseListener implements BatchRepository
{
    use ForwardsCalls;

    private BatchRepository $parent;

    public function __construct(BatchRepository $parent)
    {
        $this->parent = $parent;
    }

    public function get($limit, $before)
    {
        return $this->parent->get($limit, $before);
    }

    public function find(string $batchId)
    {
        return $this->parent->find($batchId);
    }

    public function store(PendingBatch $batch)
    {
        $jobs = $batch->jobs;
        $batchResult = $this->parent->store($batch);

        if($this->isTrackingEnabled()) {
            $batchModel = JobBatch::create([
                'batch_id' => $batchResult->id,
                'name' => $batchResult->name
            ]);

            /** @var Trackable $job */
//            foreach($jobs as $job) {
//                if ($this->validateJob($job) === true) {
//                    $jobStatus = JobStatus::create([
//                        'class' => get_class($job),
//                        'alias' => $job->alias(),
//                        'batch_id' => $batchModel->id,
//                        'percentage' => 0,
//                        'status' => Status::QUEUED,
//                        'uuid' => null,
//                        'job_id' => $job->job->getJobId(),
//                        'connection_name' => $job->job->getConnectionName(),
//                        'configuration' => $job->getJobStatusConfiguration(),
//                        'public' => $job->public(),
//                    ]);
//
//                    $modifier = JobStatusModifier::forJobStatus($jobStatus);
//                    $modifier->setStatus(Status::QUEUED);
//
//                    foreach ($job->users() as $user) {
//                        $modifier->grantAccessTo($user);
//                    }
//
//                    foreach ($job->tags() as $key => $value) {
//                        $jobStatus->tags()->create([
//                            'key' => $key,
//                            'value' => $value,
//                        ]);
//                    }
//
//                    $this->checkJobUpToDate($modifier, $job->job);
//                }
//            }
        }


        return $batchResult;
    }

    public function incrementTotalJobs(string $batchId, int $amount)
    {
        $this->parent->incrementTotalJobs($batchId, $amount);
    }

    public function decrementPendingJobs(string $batchId, string $jobId)
    {
        return $this->parent->decrementPendingJobs($batchId, $jobId);
    }

    public function incrementFailedJobs(string $batchId, string $jobId)
    {
        return $this->parent->incrementFailedJobs($batchId, $jobId);
    }

    public function markAsFinished(string $batchId)
    {
        $this->parent->markAsFinished($batchId);
    }

    public function cancel(string $batchId)
    {
        $this->parent->cancel($batchId);
    }

    public function delete(string $batchId)
    {
        $this->parent->delete($batchId);
    }

    public function transaction(Closure $callback)
    {
        return $this->parent->transaction($callback);
    }

    /**
     * Pass dynamic methods onto the router instance.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        return $this->forwardCallTo(
            $this->parent, $method, $parameters
        );
    }
}
