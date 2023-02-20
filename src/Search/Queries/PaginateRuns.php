<?php

namespace JobStatus\Search\Queries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use JobStatus\Search\Collections\JobRunCollection;

class PaginateRuns
{

    public function paginate(Builder $query, int $page, int $perPage): LengthAwarePaginator
    {
        // Assume the query only has 'where' conditions - others will work but some may cause unexpected results

        $uuidQuery = $query->clone();
        $jobIdQuery = $query->clone();

        $uuidQuery->select(['uuid as selector'])
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->whereNotNull('uuid')
            ->withoutEagerLoads()
            ->groupBy('uuid');


//        $jobIdQuery->selectRaw('CONCAT(job_id, connection_name) as selector')
        $jobIdQuery->selectRaw('job_id || connection_name as selector')
            ->selectRaw('max(created_at) as created_at')
            ->selectRaw('max(id) as id')
            ->whereNull('uuid')
            ->withoutEagerLoads()
            ->groupBy('job_id', 'connection_name');

        $uuidQuery->union($jobIdQuery)
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

//        // We need to get the job_id and connection name, or uuid, for the right page of results.
//        // Group by uuid or a row per one where uuid is null? May need to use a union here.
//        // Then order by created_at max and id max in case created_at is the same.
//        // Finally, paginate it!
//        $query->groupBy('uuid');
////        $query->select(['job_id', 'connection_name', 'uuid']);
//        // select only job id, connection name and uuid
//        $query->orderBy('created_at', 'desc')
//            ->orderBy('id', 'desc');
//
//        $query->withoutEagerLoads()
//            ->select(['uuid'])
//            ->selectRaw('max(created_at) as created_at')
//            ->selectRaw('max(id) as id');

        return $uuidQuery->paginate(perPage: $perPage, page: $page);
    }

}
