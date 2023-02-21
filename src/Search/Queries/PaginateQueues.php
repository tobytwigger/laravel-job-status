<?php

namespace JobStatus\Search\Queries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;

class PaginateQueues
{

    public function paginate(Builder $query, int $page, int $perPage): LengthAwarePaginator
    {
        $query->select(['queue'])
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->withoutEagerLoads()
            ->groupBy('queue')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        $results = $query->paginate(perPage: $perPage, page: $page);

        return new LengthAwarePaginator(
            (new JobStatusCollection($results->items()))->queues(),
            $results->total(),
            $perPage,
            $page
        );
    }

}
