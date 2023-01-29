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
        $query = static::addUpdatedBefore($query, $parameters);
        $query = static::addUserIds($query, $parameters);

        return $query;
    }

    private static function addJobAlias(Builder $query, SearchParameters $parameters): Builder
    {
        if ($parameters->getJobAlias()) {
            $query->where('job_alias', $parameters->getJobAlias());
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
            $query->where('job_class', $parameters->getJobClass());
        }

        return $query;
    }

    private static function addJobTags(Builder $query, SearchParameters $parameters): Builder
    {
        foreach ($parameters->tags()->getIncluded() as $includeTag) {
            $query->whereHas('tags', function (Builder $query) use ($includeTag) {
                $query->where(['key' => $includeTag['key'], 'value' => $includeTag['value']]);
            });
        }

        return $query;
    }

    private static function addStatuses(Builder $query, SearchParameters $parameters): Builder
    {
        if (count($parameters->getIncludeStatus()) > 0) {
            $query->whereIn('status', $parameters->getIncludeStatus());
        }
        if (count($parameters->getExcludeStatus()) > 0) {
            $query->whereNotIn('status', $parameters->getExcludeStatus());
        }

        return $query;
    }

    private static function addUpdatedBefore(Builder $query, SearchParameters $parameters): Builder
    {
        if ($parameters->getUpdatedBefore() !== null) {
            $query->where('updated_at', '<', $parameters->getUpdatedBefore());
        }

        return $query;
    }

    private static function addUserIds(Builder $query, SearchParameters $parameters): Builder
    {
        $query->where(function(Builder $query) use ($parameters) {
            foreach($parameters->getUsers() as $userId) {
                $query->orWhereHas('users', function(Builder $query) use ($userId) {
                    $query->where('user_id', $userId);
                });
            }
        });


        return $query;
    }
}
