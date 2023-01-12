<?php

namespace JobStatus\Tests\Feature\Jobs;

use Illuminate\Testing\Assert;
use JobStatus\Exception\JobCancelledException;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class SignalsTest extends TestCase
{



    /** @test */
    public function it_cancels_a_job()
    {
        $caught = false;
        try {
            (new JobFakeFactory())
                ->setAlias('my-fake-job')
                ->setTags([
                    'my-first-tag' => 1,
                    'my-second-tag' => 'mytag-value'
                ])
                ->setCallback(static::class . '@itCancelsAJobCallback')
                ->dispatch();
        } catch (\Exception $e) {
            $this->assertInstanceOf(JobCancelledException::class, $e);
            $this->assertNotNull(JobSignal::firstOrFail()->handled_at);
            $this->assertEquals('cancelled', JobStatus::firstOrFail()->status);
            $caught = true;
        }
        $this->assertTrue($caught);
    }

    public static function itCancelsAJobCallback(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
        throw new \Exception('Check for signals did not stop the job');
    }





    /** @test */
    public function it_runs_onCancel_when_a_job_is_cancelled()
    {
        $this->expectExceptionMessage('The job has been cancelled');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@itRunsOnCancelWhenAJobIsCancelled')
            ->handleSignal('cancel', static::class . '@itRunsOnCancelWhenAJobIsCancelledOnCancel')
            ->dispatch();
    }

    public static function itRunsOnCancelWhenAJobIsCancelled(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
        throw new \Exception('Check for signals did not stop the job');
    }

    public static function itRunsOnCancelWhenAJobIsCancelledOnCancel(JobFake $job)
    {
        throw new \Exception('The job has been cancelled');
    }






    /** @test */
    public function the_exception_type_can_be_overridden_for_a_signal()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The job has been cancelled and the exception overridden');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@theExceptionTypeCanBeOverriddenForASignal')
            ->handleSignal('cancel', static::class . '@theExceptionTypeCanBeOverriddenForASignalOnCancel')
            ->dispatch();

        $this->assertNotNull(JobSignal::firstOrFail()->handled_at);
    }

    public static function theExceptionTypeCanBeOverriddenForASignal(JobFake $job)
    {
        $job->status()->cancel();
        $job->checkForSignals();
    }

    public static function theExceptionTypeCanBeOverriddenForASignalOnCancel(JobFake $job)
    {
        throw new \Exception('The job has been cancelled and the exception overridden');
    }







    /** @test */
    public function it_can_handle_custom_signals()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The job has been custom signalled');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@ItCanHandleCustomSignalsCallback')
            ->handleSignal('customSignal', static::class . '@ItCanHandleCustomSignalsCustomSignal')
            ->dispatch();
    }

    public static function ItCanHandleCustomSignalsCallback(JobFake $job)
    {
        $job->status()->sendSignal('customSignal');
        $job->checkForSignals();
        throw new \Exception('Check for signals did not stop the job');
    }

    public static function ItCanHandleCustomSignalsCustomSignal(JobFake $job)
    {
        throw new \Exception('The job has been custom signalled');
    }







    /** @test */
    public function it_does_not_cancel_execution_on_custom_signals()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Check for signals did not stop the job');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@itDoesNotCancelExecutionOnCustomSignalsCallback')
            ->dispatch();
    }

    public static function itDoesNotCancelExecutionOnCustomSignalsCallback(JobFake $job)
    {
        $job->status()->sendSignal('custom_signal');
        $job->checkForSignals();
        throw new \Exception('Check for signals did not stop the job');
    }











    /** @test */
    public function it_can_be_made_to_cancel_execution_on_custom_signals()
    {
        $this->expectException(JobCancelledException::class);
        $this->expectExceptionMessage('Job stopped with signal custom_signal');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@ItCanBeMadeToCancelExecutionOnCustomSignalsCallback')
            ->dispatch();
    }

    public static function ItCanBeMadeToCancelExecutionOnCustomSignalsCallback(JobFake $job)
    {
        $job->status()->sendSignal('custom_signal', cancel: true);
        $job->checkForSignals();
        throw new \Exception('Check for signals did not stop the job');
    }









    /** @test */
    public function it_only_calls_for_a_signal_once()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Check for signals did not stop the job');

        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@ItOnlyCallsForASignalOnceCallback')
            ->handleSignal('CustomSignal', static::class . '@ItOnlyCallsForASignalOnceHandler')
            ->dispatch();

        $this->assertTrue(static::$itOnlyCallsForASignalOnceCalled);
    }

    public static bool $itOnlyCallsForASignalOnceCalled = false;

    public static function ItOnlyCallsForASignalOnceCallback(JobFake $job)
    {
        $job->status()->sendSignal('CustomSignal');
        $job->checkForSignals();
        $job->checkForSignals();
        Assert::assertTrue(static::$itOnlyCallsForASignalOnceCalled);
        throw new \Exception('Check for signals did not stop the job');
    }

    public static function ItOnlyCallsForASignalOnceHandler(JobFake $job)
    {
        if (static::$itOnlyCallsForASignalOnceCalled === true) {
            throw new \Exception('Called onCustomSignal twice');
        }
        static::$itOnlyCallsForASignalOnceCalled = true;
    }








    /** @test */
    public function parameters_can_be_passed()
    {
        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value'
            ])
            ->setCallback(static::class . '@ParametersCanBePassedCallback')
            ->handleSignal('custom-signal', static::class . '@ParametersCanBePassedHandler')
            ->dispatch();
    }

    public static function ParametersCanBePassedCallback(JobFake $job)
    {
        $job->status()->sendSignal('custom-signal', ['param1' => 'one', 'param2' => 2]);
        $job->checkForSignals();
    }

    public static function ParametersCanBePassedHandler(JobFake $job, array $parameters)
    {
        Assert::assertEquals(['param1' => 'one', 'param2' => 2], $parameters);
    }


}
