<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Models\JobStatus;

class QueryFactory
{

    public static function fromSearchParameters(SearchParameters $parameters): Builder
    {
        $query = JobStatus::query();
        $query = static::addJobAlias($query, $parameters);
        $query = static::addJobClass($query, $parameters);
        $query = static::addJobTags($query, $parameters);
        $query = static::addStatuses($query, $parameters);
        $query = static::addUuid($query, $parameters);

        return $query;
    }

    private static function addJobAlias(Builder $query, SearchParameters $parameters): Builder
    {
        if ($parameters->getJobAlias()) {
            $query->forJobAlias($parameters->getJobAlias());
        }
        return $query;
    }

    private static function addUuid(Builder $query, SearchParameters $parameters): Builder
    {
        if ($parameters->getUuid()) {
            $query->where('uuid', $parameters->getUuid());
        }
        return $query;
    }

    private static function addJobClass(Builder $query, SearchParameters $parameters): Builder
    {
        if ($parameters->getJobClass()) {
            $query->forJob($parameters->getJobClass());
        }
        return $query;
    }

    private static function addJobTags(Builder $query, SearchParameters $parameters): Builder
    {
        foreach ($parameters->tags()->getIncluded() as $includeTag) {
            $query->whereTag($includeTag['key'], $includeTag['value']);
        }
        return $query;
    }

    private static function addStatuses(Builder $query, SearchParameters $parameters): Builder
    {
        if(count($parameters->getIncludeStatus()) > 0) {
            $query->whereIn('status', $parameters->getIncludeStatus());
        }
        if(count($parameters->getExcludeStatus()) > 0) {
            $query->whereNotIn('status', $parameters->getExcludeStatus());
        }
        return $query;
    }

}
