<?php

namespace JobStatus\Search\Queries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use JobStatus\Search\Collections\JobStatusCollection;

class PaginateJobs
{
    public function paginate(Builder $query, int $page, int $perPage): LengthAwarePaginator
    {
        $query->select(['alias'])
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->withoutEagerLoads()
            ->groupBy('alias')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        $results = $query->paginate(perPage: $perPage, page: $page);

        return new LengthAwarePaginator(
            (new JobStatusCollection($results->items()))->jobs(),
            $results->total(),
            $perPage,
            $page
        );
    }
}
