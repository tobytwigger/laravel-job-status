<?php

namespace JobStatus\Share;

class ShareConfig
{

    private RetrieveConfig $config;

    public function __construct(RetrieveConfig $config)
    {
        $this->config = $confgig;
    }

    public function toString(): string
    {
        return $this->namespace() . $this->configAsJs();
    }

    private function namespace(): string
    {
        return 'window.JobStatusConfig=window.JobStatusConfig||{};';
    }

    public function configAsJs(): string
    {
        return collect($this->config->getConfig())
            ->map(fn($value, $key) => sprintf('JobStatusConfig.%s=%s;', $key, json_encode($value)))
            ->join('');
    }

}
