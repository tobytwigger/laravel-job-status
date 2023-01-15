<?php

namespace JobStatus\Tests\Feature\Listeners;

use Illuminate\Testing\Assert;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFakeFactory;
use JobStatus\Tests\TestCase;

class EnabledTest extends TestCase
{

    /** @test */
    public function no_job_status_is_created_if_the_package_is_disabled()
    {
        config()->set('laravel-job-status.enabled', true);
        $job = (new JobFakeFactory())->setAlias('my-fake-job')->setTags(['my-first-tag' => 1])->dispatch();
        $this->assertCount(1, JobStatus::all());

        config()->set('laravel-job-status.enabled', false);
        $job = (new JobFakeFactory())->setAlias('my-fake-job')->setTags(['my-first-tag' => 1])->dispatch();
        $this->assertCount(1, JobStatus::all());

        config()->set('laravel-job-status.enabled', true);
        $job = (new JobFakeFactory())->setAlias('my-fake-job')->setTags(['my-first-tag' => 1])->dispatch();
        $this->assertCount(2, JobStatus::all());
    }

}
