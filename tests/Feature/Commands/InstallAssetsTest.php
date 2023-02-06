<?php

namespace JobStatus\Tests\Feature\Commands;

use JobStatus\Dashboard\Utils\Assets;
use JobStatus\Tests\TestCase;

class InstallAssetsTest extends TestCase
{
    /** @test */
    public function it_handles_assets_already_existing()
    {
        $assets = $this->prophesize(Assets::class);
        $assets->clear()->shouldBeCalled()->willReturn(true);
        $assets->publish()->shouldBeCalled();
        $this->instance(Assets::class, $assets->reveal());

        $this->artisan('job:install')
            ->expectsOutput('Clearing old assets')
            ->expectsOutput('Old assets cleared')
            ->expectsOutput('Installing assets')
            ->expectsOutput('Installed assets')
            ->assertOk();
    }

    /** @test */
    public function it_handles_no_assets_existing()
    {
        $assets = $this->prophesize(Assets::class);
        $assets->clear()->shouldBeCalled()->willReturn(false);
        $assets->publish()->shouldBeCalled();
        $this->instance(Assets::class, $assets->reveal());

        $this->artisan('job:install')
            ->expectsOutput('Clearing old assets')
            ->expectsOutput('No assets need clearing')
            ->expectsOutput('Installing assets')
            ->expectsOutput('Installed assets')
            ->assertOk();
    }

    /** @test */
    public function it_can_be_silent()
    {
        $assets = $this->prophesize(Assets::class);
        $assets->clear()->shouldBeCalled()->willReturn(false);
        $assets->publish()->shouldBeCalled();
        $this->instance(Assets::class, $assets->reveal());

        $this->artisan('job:install --silent')
            ->doesntExpectOutput('Clearing old assets')
            ->doesntExpectOutput('Old assets cleared')
            ->doesntExpectOutput('No assets need clearing')
            ->doesntExpectOutput('Installing assets')
            ->doesntExpectOutput('Installed assets')
            ->assertOk();
    }
}
