<?php

namespace JobStatus\Tests;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\AssertBatch;
use JobStatus\Tests\fakes\AssertBatches;
use JobStatus\Tests\fakes\AssertJobStatus;
use JobStatus\Tests\fakes\AssertJobStatuses;
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
}
