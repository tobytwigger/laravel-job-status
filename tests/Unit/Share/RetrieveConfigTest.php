<?php

namespace JobStatus\Tests\Unit\Share;

use JobStatus\Share\RetrieveConfig;
use JobStatus\Tests\TestCase;

class RetrieveConfigTest extends TestCase
{

    /** @test */
    public function it_gets_the_config(){

        config()->set('laravel-job-status.routes.api.prefix', 'api/job-status');
        $config = [
            'baseUrl' => 'http://localhost/api/job-status'
        ];

        $configRepo = new RetrieveConfig();
        $this->assertEquals($config, $configRepo->getConfig());
        $this->assertEquals($config, $configRepo->toArray());
        $this->assertEquals(json_encode($config), $configRepo->toJson());
        $this->assertEquals(json_encode($config), (string) $configRepo);
    }

}
