<?php

namespace Settings\Tests;

use Prophecy\PhpUnit\ProphecyTrait;
use Settings\SettingsServiceProvider;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use ProphecyTrait;

    protected function getPackageProviders($app)
    {
        return [SettingsServiceProvider::class];
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->loadMigrationsFrom(realpath(__DIR__.'/../database/migrations'));
    }

    /**
     * Define environment setup.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
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


}
