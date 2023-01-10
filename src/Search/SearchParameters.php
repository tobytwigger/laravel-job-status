<?php

namespace JobStatus\Search;

class SearchParameters
{

    private ?string $jobClass = null;

    private ?string $jobAlias = null;

    private array $tags = [];

    private array $includeStatus = [];

    private array $excludeStatus = [];

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

    /**
     * @return array
     */
    public function getTags(): array
    {
        return $this->tags;
    }

    /**
     * @param array $tags
     * @return SearchParameters
     */
    public function setTags(array $tags): SearchParameters
    {
        $this->tags = $tags;
        return $this;
    }

    public function pushTag(string $key, mixed $value): SearchParameters
    {
        $this->tags[] = ['key' => $key, 'value' => $value];
        return $this;
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
