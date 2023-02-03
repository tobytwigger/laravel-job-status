<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Bus\Batch;
use Illuminate\Bus\PendingBatch;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class JobFakeFactory
{
    private ?string $alias = null;

    private ?array $tags = [];

    private \Closure|string|null $callback = null;

    private array $signals = [];

    private int $maxExceptions = 3;

    private int $tries = 3;

    private array $users = [];
    private bool $public = true;
    /**
     * @var true
     */
    private bool $withoutTrackable = false;
    /**
     * @var true
     */
    private bool $withoutInteractsWithQueue = false;
    /**
     * @var true
     */
    private bool $withoutBatchable = false;

    private ?string $queue = null;

    /**
     * @return int
     */
    public function getTries(): int
    {
        return $this->tries;
    }

    /**
     * @param int $tries
     * @return JobFakeFactory
     */
    public function maxTries(int $tries): JobFakeFactory
    {
        $this->tries = $tries;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getAlias(): ?string
    {
        return $this->alias;
    }

    /**
     * @param string|null $alias
     * @return JobFakeFactory
     */
    public function setAlias(?string $alias): JobFakeFactory
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * @return array|null
     */
    public function getTags(): ?array
    {
        return $this->tags;
    }

    /**
     * @param array|null $tags
     * @return JobFakeFactory
     */
    public function setTags(?array $tags): JobFakeFactory
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * @return \Closure|null
     */
    public function getCallback(): ?\Closure
    {
        return $this->callback;
    }

    /**
     * @param \Closure|null $callback
     * @return JobFakeFactory
     */
    public function setCallback(\Closure|string|null $callback): JobFakeFactory
    {
        $this->callback = $callback;

        return $this;
    }

    public function setPublic(bool $public): JobFakeFactory
    {
        $this->public = $public;

        return $this;
    }

    public function setUsers(array $users): JobFakeFactory
    {
        $this->users = $users;

        return $this;
    }

    public function create(): JobFake|JobFakeWithoutTrackable|JobFakeWithoutTrackableOrInteractsWithQueue|JobFakeWithoutTrackableOrBatchable
    {
        $job = null;
        if ($this->withoutTrackable === true) {
            if ($this->withoutInteractsWithQueue === true) {
                $job = new JobFakeWithoutTrackableOrInteractsWithQueue($this->callback ?? static::class . '@fakeCallback', queue: $this->queue);
            } elseif ($this->withoutBatchable) {
                $job = new JobFakeWithoutTrackableOrBatchable($this->callback ?? static::class . '@fakeCallback', queue: $this->queue);
            } else {
                $job = new JobFakeWithoutTrackable($this->callback ?? static::class . '@fakeCallback', queue: $this->queue);
            }
        } else {
            $job = new JobFake($this->alias, $this->tags, $this->callback ?? static::class . '@fakeCallback', $this->signals, $this->users, $this->public, queue: $this->queue);
        }
        if ($job === null) {
            throw new \Exception('Need to implement a job fake with trackable but without interacts with queue');
        }
        $job->maxExceptions = $this->maxExceptions;
        $job->tries = $this->tries;

        return $job;
    }

    public function withoutBatchable(): JobFakeFactory
    {
        $this->withoutBatchable = true;

        return $this;
    }

    public function withoutTrackable(): JobFakeFactory
    {
        $this->withoutTrackable = true;

        return $this;
    }

    public function withoutInteractsWithQueue(): JobFakeFactory
    {
        $this->withoutInteractsWithQueue = true;

        return $this;
    }

    public function fakeCallback(): void
    {
    }

    public static function dispatchBatch(PendingBatch $batch, ?int $jobCount = null): Batch
    {
        $jobCount = $jobCount ?? $batch->jobs->count();

        $batch->onConnection('database');
        static::createJobsTable();
        static::createBatchesTable();
        static::createFailedJobsTable();
        $realBatch = $batch->dispatch();

        $command = 'queue:work database --once --stop-when-empty';
        if ($batch->queue() !== null) {
            $command .= ' --queue=' . $batch->queue();
        }
        for ($i = 0; $i < $jobCount; $i++) {
            Artisan::call($command);
        }



        return $realBatch;
    }

    public static function dispatchBatchSync(PendingBatch $batch, ?int $jobCount = null)
    {
        $jobCount = $jobCount ?? $batch->jobs->count();

        $batch->onConnection('sync');
        static::createJobsTable();
        static::createBatchesTable();
        static::createFailedJobsTable();
        $realBatch = $batch->dispatch();

        return $realBatch;
    }

    public function dispatch(int $jobsToRun = 1): JobFake|JobFakeWithoutTrackable|JobFakeWithoutTrackableOrInteractsWithQueue|JobFakeWithoutTrackableOrBatchable
    {
        $job = $this->create();
        $job->onConnection('database');
        static::createJobsTable();
        app(Dispatcher::class)->dispatch($job);
        $this->runQueueWorker($jobsToRun);

        return $job;
    }

    public function runQueueWorker(int $jobsToRun)
    {
        $runCommand = 'queue:work database --once --stop-when-empty';
        if ($this->queue !== null) {
            $runCommand .= ' --queue=' . $this->queue;
        }
        for ($i = 0; $i < $jobsToRun; $i++) {
            Artisan::call($runCommand);
        }
    }


    public function dispatchSync(): JobFake|JobFakeWithoutTrackable|JobFakeWithoutTrackableOrInteractsWithQueue|JobFakeWithoutTrackableOrBatchable
    {
        $job = $this->create();
        app(Dispatcher::class)->dispatchSync($job);

        return $job;
    }

    public function handleSignal(string $signal, string $method): static
    {
        $this->signals[$signal] = $method;

        return $this;
    }

    private static function createJobsTable()
    {
        if (!Schema::hasTable('jobs')) {
            Schema::create('jobs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('queue')->index();
                $table->longText('payload');
                $table->unsignedTinyInteger('attempts');
                $table->unsignedInteger('reserved_at')->nullable();
                $table->unsignedInteger('available_at');
                $table->unsignedInteger('created_at');
            });
        }
    }

    private static function createBatchesTable()
    {
        if (!Schema::hasTable('job_batches')) {
            Schema::create('job_batches', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name');
                $table->integer('total_jobs');
                $table->integer('pending_jobs');
                $table->integer('failed_jobs');
                $table->longText('failed_job_ids');
                $table->mediumText('options')->nullable();
                $table->integer('cancelled_at')->nullable();
                $table->integer('created_at');
                $table->integer('finished_at')->nullable();
            });
        }
    }

    private static function createFailedJobsTable()
    {
        if (!Schema::hasTable('failed_jobs')) {
            Schema::create('failed_jobs', function (Blueprint $table) {
                $table->id();
                $table->string('uuid')->unique();
                $table->text('connection');
                $table->text('queue');
                $table->longText('payload');
                $table->longText('exception');
                $table->timestamp('failed_at')->useCurrent();
            });
        }
    }

    public function maxExceptions(int $maxExceptions): JobFakeFactory
    {
        $this->maxExceptions = $maxExceptions;

        return $this;
    }

    public function onQueue(?string $queue)
    {
        $this->queue = $queue;

        return $this;
    }
}
