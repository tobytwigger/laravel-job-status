<?php

namespace JobStatus\Tests\Unit\Share;

use JobStatus\Share\RetrieveConfig;
use JobStatus\Tests\TestCase;

class RetrieveConfigTest extends TestCase
{
    /** @test */
    public function it_gets_the_config()
    {
        config()->set('laravel-job-status.routes.api.base_url', 'http://example.com');
        config()->set('laravel-job-status.routes.api.prefix', 'api/job-status');
        $config = [
            'baseUrl' => 'http://example.com/api/job-status',
        ];

        $configRepo = new RetrieveConfig();
        $this->assertEquals($config, $configRepo->getConfig());
        $this->assertEquals($config, $configRepo->toArray());
        $this->assertEquals(json_encode($config), $configRepo->toJson());
        $this->assertEquals(json_encode($config), (string) $configRepo);
    }

    /**
     * @test
     * @dataProvider providerForBaseUrlPrefixConverter
     */
    public function it_successfully_converts_a_base_url_and_prefix_into_a_url(?string $baseUrl, ?string $prefix, string $result)
    {
        config()->set('laravel-job-status.routes.api.base_url', $baseUrl);
        config()->set('laravel-job-status.routes.api.prefix', $prefix);

        $configRepo = new RetrieveConfig();
        $this->assertEquals($result, $configRepo->getConfig()['baseUrl']);
    }

    public function providerForBaseUrlPrefixConverter()
    {
        return [
            // Base URL, Prefix, Result

            // Test abiltiy to add / to the URL
            ['https://example.com/', '/api', 'https://example.com/api'],
            ['https://example.com', '/api', 'https://example.com/api'],
            ['https://example.com/', 'api', 'https://example.com/api'],
            ['https://example.com', 'api', 'https://example.com/api'],

            // Test some being null
            ['https://example.com/', null, 'https://example.com/'],
            [null, '/api', 'http://localhost/api'],
            [null, null, 'http://localhost'],
        ];
    }
}
