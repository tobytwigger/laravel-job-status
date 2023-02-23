<?php

namespace JobStatus\Search\Queries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use JobStatus\Search\Collections\JobRunCollection;
use JobStatus\Search\Collections\JobStatusCollection;

class PaginateBatches
{

    public function paginate(Builder $query, int $page, int $perPage, bool $bypassAuth = true, ?int $userId = null): LengthAwarePaginator
    {
        $query->select(['batch_id'])
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->withoutEagerLoads()
            ->groupBy('batch_id')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        $results = $query->paginate(perPage: $perPage, page: $page);

        return new LengthAwarePaginator(
            (new JobStatusCollection($results->items()))->batches(),
            $results->total(),
            $perPage,
            $page
        );
    }

}
