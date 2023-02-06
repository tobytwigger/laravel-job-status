<?php

namespace JobStatus\Tests\Unit\Share;

use JobStatus\Share\RetrieveConfig;
use JobStatus\Share\ShareConfig;
use JobStatus\Tests\TestCase;

class ShareConfigTest extends TestCase
{
    /** @test */
    public function to_string_returns_the_settings_and_config_as_a_string()
    {
        $esConfig = $this->prophesize(RetrieveConfig::class);
        $esConfig->getConfig()->willReturn([
            'config1' => 'value1', 'config2' => 'value2',
        ]);

        $display = new ShareConfig($esConfig->reveal());

        $this->assertEquals(
            'window.JobStatusConfig=window.JobStatusConfig||{};JobStatusConfig.config1="value1";JobStatusConfig.config2="value2";',
            $display->toString()
        );
    }
}
