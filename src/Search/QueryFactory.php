<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Models\JobStatus;

class QueryFactory
{

    public static function fromSearchParameters(SearchParameters $parameters): Builder
    {
        $query = JobStatus::query();
        if($parameters->getJobAlias()) {
            $query->whereJobAlias($parameters->getJobAlias());
        }
        if($parameters->getJobClass()) {
            $query->whereJobClass($parameters->getJobClass());
        }
        return $query;
    }

}
