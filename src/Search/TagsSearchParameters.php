<?php

namespace JobStatus\Search;

class TagsSearchParameters
{

    private array $include = [];

    public function include(string $key, string $value): TagsSearchParameters
    {
        $this->include[] = ['key' => $key, 'value' => $value];
        return $this;
    }

    public function getIncluded(): array
    {
        return $this->include;
    }

}
