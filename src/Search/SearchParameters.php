<?php

namespace JobStatus\Search;

use JobStatus\Enums\Status;

class SearchParameters
{

    private ?string $jobClass = null;

    private ?string $jobAlias = null;

    private TagsSearchParameters $tagsSearchParameters;

    /**
     * @var array|Status[]
     */
    private array $includeStatus = [];

    /**
     * @var array|Status[]
     */
    private array $excludeStatus = [];

    public function __construct()
    {
        $this->tagsSearchParameters = new TagsSearchParameters();
    }

    /**
     * @return string|null
     */
    public function getJobClass(): ?string
    {
        return $this->jobClass;
    }

    /**
     * @param string|null $jobClass
     * @return SearchParameters
     */
    public function setJobClass(?string $jobClass): SearchParameters
    {
        $this->jobClass = $jobClass;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getJobAlias(): ?string
    {
        return $this->jobAlias;
    }

    /**
     * @param string|null $jobAlias
     * @return SearchParameters
     */
    public function setJobAlias(?string $jobAlias): SearchParameters
    {
        $this->jobAlias = $jobAlias;
        return $this;
    }

    public function tags(): TagsSearchParameters
    {
        return $this->tagsSearchParameters;
    }

    /**
     * @return array
     */
    public function getIncludeStatus(): array
    {
        return $this->includeStatus;
    }

    /**
     * @param array $includeStatus
     * @return SearchParameters
     */
    public function setIncludeStatus(array $includeStatus): SearchParameters
    {
        $this->includeStatus = $includeStatus;
        return $this;
    }

    /**
     * @return array
     */
    public function getExcludeStatus(): array
    {
        return $this->excludeStatus;
    }

    /**
     * @param array $excludeStatus
     * @return SearchParameters
     */
    public function setExcludeStatus(array $excludeStatus): SearchParameters
    {
        $this->excludeStatus = $excludeStatus;
        return $this;
    }

}
