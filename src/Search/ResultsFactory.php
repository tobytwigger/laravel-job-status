<?php

namespace JobStatus\Search;

use Illuminate\Database\Eloquent\Builder;
use JobStatus\Search\Collections\JobStatusCollection;

class ResultsFactory
{
    public static function fromQuery(Builder $query): JobStatusCollection
    {
        return $query->with([
            'tags', 'messages', 'signals', 'statuses', 'users', 'exception',
        ])
            ->orderBy('created_at', 'DESC')
            ->get();
    }
}
