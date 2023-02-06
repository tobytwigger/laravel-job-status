<?php

namespace JobStatus\Tests\Feature\Dashboard\Http\Controllers;

use Illuminate\Support\Facades\Gate;
use JobStatus\Dashboard\Utils\Assets;
use JobStatus\Dashboard\Utils\InstalledVersion;
use JobStatus\Tests\TestCase;

class DashboardIndexTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('job:install --silent')->assertOk();
    }

    /** @test */
    public function it_returns_403_if_you_do_not_have_the_permission()
    {
        $this->prophesizeUserWithId(1);

        $response = $this->get(route('job-status.dashboard'));
        $response->assertForbidden();
    }

    /** @test */
    public function it_returns_403_if_you_are_not_logged_in()
    {
        $response = $this->get(route('job-status.dashboard'));
        $response->assertForbidden();
    }

    /** @test */
    public function variables_are_shared_with_the_view()
    {
        $this->prophesizeUserWithId(1);

        config()->set('laravel-job-status.dashboard.path', 'job--status-path');
        config()->set('laravel-job-status.dashboard.domain', 'job-status-domain.com');

        $assets = $this->prophesize(Assets::class);
        $assets->inDate()->willReturn(false);
        $this->app->instance(Assets::class, $assets->reveal());

        $version = $this->prophesize(InstalledVersion::class);
        $version->version()->willReturn('v1.0.0');
        $this->app->instance(InstalledVersion::class, $version->reveal());

        Gate::define('viewJobStatus', fn ($user) => true);
        $response = $this->get(route('job-status.dashboard'));
        $response->assertOk();
        $data = $response->viewData('jobStatusVariables');
        $this->assertIsArray($data);
        $this->assertEquals([
            'path' => 'job--status-path',
            'domain' => 'job-status-domain.com',
            'version' => 'v1.0.0',
            'assets_in_date' => false,
        ], $data);
    }
}
