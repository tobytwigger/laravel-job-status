<?php

namespace JobStatus\Tests\Feature;

use Illuminate\Testing\Assert;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class TrackableTest extends TestCase
{
    /** @test */
    public function it_creates_a_job_status_on_job_dispatch()
    {
        $this->assertDatabaseCount(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), 0);

        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'job_class' => JobFake::class,
            'job_alias' => 'my-fake-job',
        ]);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-first-tag', 'value' => '1',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-second-tag', 'value' => 'mytag-value',
        ]);
    }

    /** @test */
    public function it_creates_a_job_status_on_job_dispatch_now()
    {
        $this->assertDatabaseCount(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), 0);

        dispatch_now(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'job_class' => JobFake::class,
            'job_alias' => 'my-fake-job',
        ]);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-first-tag', 'value' => '1',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-second-tag', 'value' => 'mytag-value',
        ]);
    }

    /** @test */
    public function it_creates_a_job_status_on_job_dispatch_sync()
    {
        $this->assertDatabaseCount(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), 0);

        dispatch_sync(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'job_class' => JobFake::class,
            'job_alias' => 'my-fake-job',
        ]);

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-first-tag', 'value' => '1',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags'), [
            'key' => 'my-second-tag', 'value' => 'mytag-value',
        ]);
    }

    /** @test */
    public function it_changes_the_job_status_to_finished()
    {
        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'queued',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'started',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'succeeded',
        ]);
    }

    /** @test */
    public function it_changes_the_percentage_to_100_on_finished()
    {
        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ]
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'percentage' => 100.0,
        ]);
    }

    /** @test */
    public function it_changes_the_percentage_to_100_if_the_job_fails()
    {
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: fn () => throw new \Exception('Job went wrong')
            ));
        } catch (\Exception $e) {
        }

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
            'percentage' => 100.0,
        ]);
    }

    /** @test */
    public function it_changes_the_job_status_to_failed()
    {
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: fn () => throw new \Exception('Job went wrong')
            ));
        } catch (\Exception $e) {
        }

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'queued',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'started',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'failed',
        ]);
    }

    /** @test */
    public function messages_can_be_sent()
    {
        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ],
            callback: fn (JobFake $job) => $job->message('This is a test message', 'success')
        ));

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages'), [
            'message' => 'This is a test message',
            'type' => 'success',
        ]);
    }

    /** @test */
    public function percentages_can_be_updated()
    {
        dispatch(new JobFake(
            alias: 'my-fake-job',
            tags: [
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ],
            callback: function (JobFake $job) {
                $job->percentage(52.6);
                $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), [
                    'percentage' => 52.6,
                ]);
            }
        ));
    }

    /** @test */
    public function it_cancels_a_job()
    {
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: function (JobFake $job) {
                    $job->jobStatus->cancel();
                    $job->checkForSignals();

                    throw new \Exception('Check for signals did not stop the job');
                }
            ));
        } catch (\Exception $e) {
            $this->assertInstanceOf(JobCancelledException::class, $e);
            $this->assertNotNull(JobSignal::firstOrFail()->handled_at);
            $this->assertEquals('cancelled', JobStatus::firstOrFail()->status);
        }
    }

    /** @test */
    public function it_runs_on_cancel_when_a_job_is_cancelled()
    {
        $this->expectExceptionMessage('The job has been cancelled');

        dispatch(
            new class() extends JobFake {
                public function __construct()
                {
                    parent::__construct(
                        alias: 'my-fake-job',
                        tags: [
                            'my-first-tag' => 1,
                            'my-second-tag' => 'mytag-value',
                        ],
                        callback: function (JobFake $job) {
                            $job->jobStatus->cancel();
                            $job->checkForSignals();

                            throw new \Exception('Check for signals did not stop the job');
                        }
                    );
                }

                public function onCancel()
                {
                    throw new \Exception('The job has been cancelled');
                }
            }
        );
    }

    /** @test */
    public function the_exception_type_can_be_overridden_for_a_signal()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The job has been cancelled and the exception overridden');

        dispatch(new class() extends JobFake {
            public function __construct()
            {
                parent::__construct(
                    alias: 'my-fake-job',
                    tags: [
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ],
                    callback: function (JobFake $job) {
                        $job->jobStatus->cancel();
                        $job->checkForSignals();
                    }
                );
            }

            public function onCancel()
            {
                throw new \Exception('The job has been cancelled and the exception overridden');
            }
        });

        $this->assertNotNull(JobSignal::firstOrFail()->handled_at);
    }

    /** @test */
    public function it_can_handle_custom_signals()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The job has been custom signalled');

        dispatch(new class() extends JobFake {
            public function __construct()
            {
                parent::__construct(
                    alias: 'my-fake-job',
                    tags: [
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ],
                    callback: function (JobFake $job) {
                        $job->jobStatus->sendSignal('customSignal');
                        $job->checkForSignals();

                        throw new \Exception('Check for signals did not stop the job');
                    }
                );
            }

            public function onCustomSignal()
            {
                throw new \Exception('The job has been custom signalled');
            }
        });
    }

    /** @test */
    public function it_does_not_cancel_execution_on_custom_signals()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Check for signals did not stop the job');

        dispatch(
            new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: function (JobFake $job) {
                    $job->jobStatus->sendSignal('custom_signal');
                    $job->checkForSignals();

                    throw new \Exception('Check for signals did not stop the job');
                }
            )
        );
    }

    /** @test */
    public function it_can_be_made_to_cancel_execution_on_custom_signals()
    {
        $this->expectException(JobCancelledException::class);
        $this->expectExceptionMessage('Job stopped with signal custom_signal');

        dispatch(
            new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: function (JobFake $job) {
                    $job->jobStatus->sendSignal('custom_signal', cancel: true);
                    $job->checkForSignals();

                    throw new \Exception('Check for signals did not stop the job');
                }
            )
        );
    }

    /** @test */
    public function it_only_calls_for_a_signal_once()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Check for signals did not stop the job');

        dispatch(new class() extends JobFake {
            public bool $called = false;

            public function __construct()
            {
                parent::__construct(
                    alias: 'my-fake-job',
                    tags: [
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ],
                    callback: function (JobFake $job) {
                        $job->jobStatus->sendSignal('CustomSignal');
                        $job->checkForSignals();
                        $job->checkForSignals();
                        Assert::assertTrue($job->called);

                        throw new \Exception('Check for signals did not stop the job');
                    }
                );
            }

            public function onCustomSignal()
            {
                if ($this->called === true) {
                    throw new \Exception('Called onCustomSignal twice');
                }
                $this->called = true;
            }
        });
    }

    /** @test */
    public function parameters_can_be_passed()
    {
        dispatch(new class() extends JobFake {
            public bool $called = false;

            public function __construct()
            {
                parent::__construct(
                    alias: 'my-fake-job',
                    tags: [
                        'my-first-tag' => 1,
                        'my-second-tag' => 'mytag-value',
                    ],
                    callback: function (JobFake $job) {
                        $job->jobStatus->sendSignal('custom-signal', ['param1' => 'one', 'param2' => 2]);
                        $job->checkForSignals();
                    }
                );
            }

            public function onCustomSignal($parameters)
            {
                Assert::assertEquals(['param1' => 'one', 'param2' => 2], $parameters);
            }
        });
    }

    /** @test */
    public function it_marks_the_job_as_succeeded_if_it_is_released()
    {
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: fn (JobFake $job) => $job->release(5)
            ));
        } catch (\Exception $e) {
        }

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'succeeded',
        ]);
    }

    /** @test */
    public function it_records_a_new_job_if_a_job_fails()
    {
        try {
            dispatch(new JobFake(
                alias: 'my-fake-job',
                tags: [
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value',
                ],
                callback: fn () => throw new \Exception('Job went wrong')
            ));
        } catch (\Exception $e) {
        }

        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'queued',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'started',
        ]);
        $this->assertDatabaseHas(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), [
            'status' => 'failed',
        ]);
    }
}
