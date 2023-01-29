<?php

namespace JobStatus\Tests\Feature\Jobs;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class PercentageTest extends TestCase
{
    private static bool $calledPercentagesCanBeUpdatedCallback = false;

    /** @test */
    public function percentages_can_be_updated()
    {
        $calledCallback = false;
        (new JobFakeFactory())
            ->setAlias('my-fake-job')
            ->setTags([
                'my-first-tag' => 1,
                'my-second-tag' => 'mytag-value',
            ])
            ->setCallback(static::class . '@percentagesCanBeUpdatedCallback')
            ->dispatch();

        $this->assertTrue(static::$calledPercentagesCanBeUpdatedCallback);
    }

    public static function percentagesCanBeUpdatedCallback(JobFake $job)
    {
        Assert::assertFalse(JobStatus::where('percentage', 52.6)->exists());
        $job->status()->setPercentage(52.6);
        Assert::assertTrue(JobStatus::where('percentage', 52.6)->exists());
        $job->status()->setPercentage(89.0);
        Assert::assertTrue(JobStatus::where('percentage', 89.0)->exists());
        Assert::assertFalse(JobStatus::where('percentage', 52.6)->exists());
        static::$calledPercentagesCanBeUpdatedCallback = true;
    }
}
