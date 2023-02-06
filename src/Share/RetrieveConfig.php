<?php

namespace JobStatus\Share;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Facades\URL;

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
        return [
            'baseUrl' => URL::to(config('laravel-job-status.routes.api.prefix')),
        ];
    }

    public function __toString(): string
    {
        return $this->toJson();
    }
}
