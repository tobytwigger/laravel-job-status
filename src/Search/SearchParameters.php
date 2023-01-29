<?php

namespace JobStatus\Search;

use Carbon\Carbon;
use JobStatus\Enums\Status;

class SearchParameters
{
    private ?string $jobClass = null;

    private ?string $jobAlias = null;

    private TagsSearchParameters $tagsSearchParameters;

    private ?string $uuid = null;

    private ?Carbon $updatedBefore = null;

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
     * @return string|null
     */
    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    /**
     * @param string|null $uuid
     * @return SearchParameters
     */
    public function setUuid(?string $uuid): SearchParameters
    {
        $this->uuid = $uuid;

        return $this;
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

    /**
     * @return Carbon|null
     */
    public function getUpdatedBefore(): ?Carbon
    {
        return $this->updatedBefore;
    }

    /**
     * @param Carbon|null $updatedBefore
     * @return SearchParameters
     */
    public function setUpdatedBefore(?Carbon $updatedBefore): SearchParameters
    {
        $this->updatedBefore = $updatedBefore;

        return $this;
    }
}
