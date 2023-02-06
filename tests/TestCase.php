<?php

namespace JobStatus\Tests;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use JobStatus\Exceptions\CannotBeRetriedException;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Retry\JobRetrier;
use JobStatus\Retry\JobRetrierFactory;
use JobStatus\Retry\Retrier;
use JobStatus\Tests\fakes\AssertBatch;
use JobStatus\Tests\fakes\AssertBatches;
use JobStatus\Tests\fakes\AssertJobStatus;
use JobStatus\Tests\fakes\AssertJobStatuses;
use Prophecy\Argument;
use Prophecy\PhpUnit\ProphecyTrait;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use ProphecyTrait, RefreshDatabase;

    protected function getPackageProviders($app)
    {
        return [JobStatusServiceProvider::class];
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->loadMigrationsFrom(realpath(__DIR__ . '/../database/migrations'));
//        Artisan::call('job:install --silent');
    }

    /**
     * Define environment setup.
     *
     * @param  \Illuminate\Foundation\Application  $app
     */
    protected function getEnvironmentSetUp($app)
    {
        $app['config']->set('database.default', 'test');
        $app['config']->set('database.connections.test', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);
    }

    public function assertJob(JobStatus $jobStatus): AssertJobStatus
    {
        return new AssertJobStatus($jobStatus);
    }

    public function assertJobs(): AssertJobStatuses
    {
        return new AssertJobStatuses();
    }

    public function assertBatch(JobBatch $batch): AssertBatch
    {
        return new AssertBatch($batch);
    }

    public function assertBatches(): AssertBatches
    {
        return new AssertBatches();
    }

    public function prophesizeUserWithId(int $id): void
    {
        $user = $this->prophesize(Authenticatable::class);
        $user->getAuthIdentifier()->willReturn($id);
        $user->id = $id;
        $userRevealed = $user->reveal();
        $this->be($userRevealed);
    }

    public function assertWillRetryJobStatus(JobStatus $jobStatus)
    {
        $retrier = $this->prophesize(JobRetrier::class);
        $retrier->retry()->shouldBeCalled();

        $retrierFactory = $this->prophesize(JobRetrierFactory::class);
        $retrierFactory->for(
            Argument::that(fn ($arg) => $arg instanceof JobStatus && $arg->is($jobStatus))
        )->shouldBeCalled()->willReturn($retrier->reveal());

        Retrier::swap($retrierFactory->reveal());
    }

    public function assertWillFailRetryingJobStatus(JobStatus $jobStatus)
    {
        $retrier = $this->prophesize(JobRetrier::class);
        $retrier->retry()->shouldBeCalled()->willThrow(new CannotBeRetriedException());

        $retrierFactory = $this->prophesize(JobRetrierFactory::class);
        $retrierFactory->for(
            Argument::that(fn ($arg) => $arg instanceof JobStatus && $arg->is($jobStatus))
        )->shouldBeCalled()->willReturn($retrier->reveal());

        Retrier::swap($retrierFactory->reveal());
    }

    public function assertNoJobStatusesRetried()
    {
        $retrierFactory = $this->prophesize(JobRetrierFactory::class);
        $retrierFactory->for(Argument::any())->shouldNotBeCalled();

        Retrier::swap($retrierFactory->reveal());
    }
}
