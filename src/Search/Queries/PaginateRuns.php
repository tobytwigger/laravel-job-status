<?php

namespace JobStatus\Search\Queries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use JobStatus\Search\Collections\JobStatusCollection;

class PaginateRuns
{
    public function paginate(Builder $query, int $page, int $perPage): LengthAwarePaginator
    {
        $query->select(['selector'])
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->withoutEagerLoads()
            ->groupBy('selector')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        $results = $query->paginate(perPage: $perPage, page: $page);

        return new LengthAwarePaginator(
            (new JobStatusCollection($results->items()))->runs(),
            $results->total(),
            $perPage,
            $page
        );
    }
}
