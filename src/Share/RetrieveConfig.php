<?php

namespace JobStatus\Share;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RetrieveConfig implements Arrayable, Jsonable
{
    public function toArray()
    {
        return $this->getConfig();
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function getConfig(): array
    {
        $baseUrl = config('laravel-job-status.routes.api.base_url');
        $prefix = config('laravel-job-status.routes.api.prefix');
        if($baseUrl === null) {
            $baseUrl = URL::to(config('laravel-job-status.routes.api.prefix'));
        } else {
            $baseUrl = sprintf(
                '%s/%s',
                Str::endsWith($baseUrl, '/') ? Str::substr($baseUrl, 0, -1) : $baseUrl,
                Str::startsWith($prefix, '/') ? Str::substr($prefix, 1) : $prefix,
            );
        }
        return [
            'baseUrl' => $baseUrl
        ];
    }

    public function __toString(): string
    {
        return $this->toJson();
    }
}
